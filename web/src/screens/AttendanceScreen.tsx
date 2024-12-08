import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useZxing } from "react-zxing";
import { useAttendanceList } from "../hooks/api/useAttendanceList";
import { AttendanceList } from "../types/types";
import LoadingSpinner from "@components/navigation/LoadingSpinner";
import { useUpdateAttendance } from "../hooks/api/useAttendanceUpdateMutation";

function filterDataByUserTicketCodeOrName(
  data: AttendanceList[],
  searchTerm: string
): AttendanceList[] {
  return data.filter((item) => {
    return (
      (item.userTicketCode
        ? item.userTicketCode.toLowerCase().includes(searchTerm.toLowerCase())
        : false) ||
      (item.name
        ? item.name.toLowerCase().includes(searchTerm.toLowerCase())
        : false)
    );
  });
}

export default function AttendanceScreen({ navbar }: { navbar: JSX.Element }) {
  // get event selected
  let queryId = -1;
  const { id } = useParams();
  if (id !== undefined) {
    queryId = parseInt(id);
  }

  // useStates
  const [scannedQRCode, setScannedQRCode] = useState("");
  const [currentSearchField, setCurrentSearchField] = useState("");
  const [filteredAttendanceList, setFilteredAttendanceList] = useState<
    AttendanceList[]
  >([]);
  const [originalAttendanceList, setOriginalAttendanceList] = useState<
    AttendanceList[]
  >([]);
  const [statusText, setStatusText] = useState("Scan first ticket");
  const [totalAttendees, setTotalAttendees] = useState(0);
  const [totalCheckedIn, setTotalCheckedIn] = useState(0);

  // Mutation hook
  const { data: nameData, mutateAsync, status } = useUpdateAttendance();

  // Get current attendance list
  const {
    data: attendanceList,
    error: errorAttendanceList,
    isLoading: loadingAttendanceList,
    status: statusAttendanceList,
  } = useAttendanceList(queryId);

  // update values once data is fetched
  useEffect(() => {
    if (statusAttendanceList === "success") {
      setOriginalAttendanceList(attendanceList);
      setFilteredAttendanceList(attendanceList);
      setTotalAttendees(attendanceList.length);
      const count = attendanceList.filter(
        (obj) => obj.attendance === true
      ).length;
      setTotalCheckedIn(count);
    }
  }, [statusAttendanceList, attendanceList]);

  // Update status text as it changes
  useEffect(() => {
    if (status === "success") {
      setStatusText("Entered successfully: " + nameData.name);
    } else if (status == "pending") {
      setStatusText("Loading...");
    } else if (status == "error") {
      setStatusText("Update failed");
    }
  }, [statusText, status]);

  // QR decoding
  const { ref } = useZxing({
    onDecodeResult(decodedQRCode) {
      if (scannedQRCode != decodedQRCode.getText()) {
        const filteredData = filterDataByUserTicketCodeOrName(
          originalAttendanceList,
          decodedQRCode.getText()
        );
        setScannedQRCode(decodedQRCode.getText());
        setCurrentSearchField(decodedQRCode.getText());
        setFilteredAttendanceList(filteredData);
      }
    },
  });

  // update search
  function handleOnSearchChanged(event: React.ChangeEvent<HTMLInputElement>) {
    const filteredData = filterDataByUserTicketCodeOrName(
      originalAttendanceList,
      event.target.value
    );
    setCurrentSearchField(event.target.value);
    setFilteredAttendanceList(filteredData);
  }

  //
  function updateCheckbox(id: number) {
    let user = originalAttendanceList.find((foundUser) => foundUser.id === id);
    if (user) {
      let index = originalAttendanceList.indexOf(user);
      user.attendance = !user.attendance;
      originalAttendanceList.fill(user, index, index++);
      if (user.attendance) {
        setTotalCheckedIn(totalCheckedIn + 1);
      } else {
        setTotalCheckedIn(totalCheckedIn - 1);
      }
      mutateAsync({
        peopleTicketId: user.id,
        attendance: user.attendance,
      });
    }
  }

  if (loadingAttendanceList) {
    return <LoadingSpinner />;
  }

  return (
    <div className="from-AUIS-dark-teal to-AUIS-teal min-h-[calc(100vh)] bg-gradient-to-b">
      {navbar}
      <h1 className="text-center text-white">{statusText}</h1>
      <h1 className="text-center text-white">Last Scanned: {scannedQRCode}</h1>
      <div className="flex items-center justify-center">
        <video className="w-[40rem] py-2" ref={ref} />
      </div>
      <div className="flex items-center justify-center">
        <input
          type="text"
          placeholder="Search Name/Ticket Number"
          onChange={(e) => {
            handleOnSearchChanged(e);
          }}
          value={currentSearchField}
          className="input mx-2 flex w-full max-w-[40rem] items-center justify-center rounded-xl border px-3 py-2 text-lg leading-tight shadow focus:outline-none"
        />
      </div>
      <div>
        <div className="m-2 flex items-center justify-center rounded-lg text-white">
          <div className="grid max-w-[40rem] grid-cols-3 grid-rows-1">
            <div className="text-center text-lg">Name</div>

            <div className="text-center text-lg">Ticket Id</div>
            <div className="text-center text-lg">Attendance</div>
          </div>
        </div>
        <div className="flex items-center justify-center pb-2">
          <div className="m-2 max-h-64 w-full max-w-[40rem] overflow-y-scroll rounded-lg bg-white">
            {filteredAttendanceList && !errorAttendanceList ? (
              <>
                {filteredAttendanceList.map((data, index) => {
                  return (
                    <div key={data.id} className="">
                      <div
                        className={`grid grid-cols-3 grid-rows-1 py-2 ${index % 2 == 1 ? "bg-AUIS-teal bg-opacity-10" : "bg-white"}`}
                      >
                        <div className="break-words text-center">
                          {data.name}
                        </div>
                        <div className="break-all text-center">
                          {data.userTicketCode}
                        </div>
                        <div className="flex items-center justify-center">
                          <input
                            type="checkbox"
                            className="accent-AUIS-teal scale-150"
                            defaultChecked={data.attendance}
                            onChange={() => updateCheckbox(data.id)}
                          ></input>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </>
            ) : (
              <>
                <p className="text-center">
                  Sorry, there are no attendees for this event or an error
                  occurred
                </p>
              </>
            )}
          </div>
        </div>
        <p className="py-2 text-center text-white">
          Attendance: {totalCheckedIn} {" / "} {totalAttendees}
        </p>
      </div>
    </div>
  );
}
