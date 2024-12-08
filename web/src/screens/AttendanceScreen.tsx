import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useZxing } from "react-zxing";
import { useAttendanceList } from "../hooks/api/useAttendanceList";
import { AttendanceList } from "../types/types";
import LoadingSpinner from "@components/navigation/LoadingSpinner";
import { useUpdateUserName } from "../hooks/api/useAttendanceUpdateMutation";

export default function AttendanceScreen({ navbar }: { navbar: JSX.Element }) {
  let queryId = -1;
  const { id } = useParams();
  if (id !== undefined) {
    queryId = parseInt(id);
  }


const { data : nameData, mutateAsync, status } = useUpdateUserName();

const [textidk, settextId] = useState("Scan first ticket")


  const {
    data: attendanceList,
    error: errorAttendanceList,
    isLoading: loadingAttendanceList,
    status: statusAttendanceList,
  } = useAttendanceList(queryId);

  useEffect(() => {
    if (statusAttendanceList === "success") {
      setOriginalAttendanceList(attendanceList);
      setFilteredAttendanceList(attendanceList);
    }
  }, [statusAttendanceList, attendanceList]);

  useEffect(() => {
    if (status === "success") {
      settextId("Entered successfully: " +  nameData.name)
    } else if (status == "pending"){
      settextId("Loading...")
    } else if (status == "error"){
      settextId("Update failed")
    }
  }, [textidk, status]);

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

  const [scannedQRCode, setScannedQRCode] = useState("");
  const [currentSearchField, setCurrentSearchField] = useState("");
  const [filteredAttendanceList, setFilteredAttendanceList] = useState<
    AttendanceList[]
  >([]);
  const [originalAttendanceList, setOriginalAttendanceList] = useState<
    AttendanceList[]
  >([]);

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

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    const filteredData = filterDataByUserTicketCodeOrName(
      originalAttendanceList,
      e.target.value
    );
    setCurrentSearchField(e.target.value);
    setFilteredAttendanceList(filteredData);
  }

  function updateCheckbox(e: React.ChangeEvent<HTMLInputElement>, id: number) {
    let tempObj = originalAttendanceList.find((o) => o.id === id);
    if (tempObj) {
      let index = originalAttendanceList.indexOf(tempObj);
      tempObj.attendance = !tempObj.attendance;
      originalAttendanceList.fill(tempObj, index, index++);
      mutateAsync({ peopleTicketId: tempObj.id, attendance: tempObj.attendance })
    }
  }

  if (loadingAttendanceList) {
    return <LoadingSpinner />;
  }

  return (
    <div className="from-AUIS-dark-teal to-AUIS-teal min-h-[calc(100vh)] bg-gradient-to-b">
      {navbar}
      <h1 className="text-center text-white">
        {textidk}
      </h1>
      <h1 className="text-center text-white">Last Scanned: {scannedQRCode}</h1>
      <div className="flex items-center justify-center">
        <video className="w-[40rem] py-2" ref={ref} />
      </div>
      <div className="flex items-center justify-center">
        <input
          type="text"
          placeholder="Search Name/Ticket Number"
          onChange={(e) => {handleOnChange(e)}}
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
                            onChange={(e) => updateCheckbox(e, data.id)}
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
      </div>
    </div>
  );
}
