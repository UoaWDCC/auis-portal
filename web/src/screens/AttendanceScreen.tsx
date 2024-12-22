import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useAttendanceList } from "../hooks/api/useAttendanceList";
import { AttendanceList } from "../types/types";
import LoadingSpinner from "@components/navigation/LoadingSpinner";
import { useUpdateAttendance } from "../hooks/api/useAttendanceUpdateMutation";
import {
  IDetectedBarcode,
  Scanner,
  useDevices,
} from "@yudiel/react-qr-scanner";

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

  // get all cameras
  const cameraDevices = useDevices();

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
  const [cameraError, setCameraError] = useState(false);
  const [cameraId, setCameraId] = useState("");
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

  // update values once data is fetched
  useEffect(() => {
    if (cameraDevices.length > 0) {
      setCameraId(cameraDevices[0].deviceId);
    }
  }, []);

  function onQRcodeScanned(decodedQRCode: IDetectedBarcode[]) {
    if (scannedQRCode != decodedQRCode[0].rawValue) {
      const filteredData = filterDataByUserTicketCodeOrName(
        originalAttendanceList,
        decodedQRCode[0].rawValue
      );
      setScannedQRCode(decodedQRCode[0].rawValue);
      setCurrentSearchField(decodedQRCode[0].rawValue);
      setFilteredAttendanceList(filteredData);
    }
  }

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
        {/* <div>TESTING</div>
        <video className="w-[40rem] py-2" ref={ref} /> */}
        <div className="w-[35rem] py-2">
          {cameraError ? (
            <p className="py-5 text-center text-white">
              There was an error loading the camera, please try a different
              camera, make sure that you have given access to use the camera and
              try to refresh the page
            </p>
          ) : (
            <Scanner
              onScan={(result) => onQRcodeScanned(result)}
              allowMultiple={true}
              scanDelay={1000}
              constraints={{ deviceId: cameraId }}
              onError={() => setCameraError(true)}
              styles={{}}
            />
          )}
        </div>
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
        <div className="flex items-center justify-center">
          <div className="w-[40rem] px-3 pb-10">
            <p className="text-center text-lg text-white">
              Select the camera you wish to use
            </p>
            <select
              className="input flex w-full items-center justify-center rounded-xl border px-3 py-2 text-lg leading-tight shadow focus:outline-none"
              onChange={(e) => {
                setCameraError(false);
                setCameraId(e.target.value);
              }}
            >
              {cameraDevices.map((cameraDevice) => {
                return (
                  <option
                    className="flex w-full items-center justify-center rounded-xl border px-3 py-2 text-lg leading-tight text-gray-400 shadow focus:outline-none"
                    key={cameraDevice.deviceId}
                    value={cameraDevice.deviceId}
                  >
                    {cameraDevice.label}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
