import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useZxing } from "react-zxing";
import { UseZxingOptionsWithConstraints } from "react-zxing/lib/useZxing";

function AttendanceScreen({ navbar }: { navbar: JSX.Element }) {
  type DataItem = {
    name: string;
    id: number;
    userTicketCode: string;
    attendance: boolean;
  };

  let queryId = -1;
  const { id } = useParams();
  if (id !== undefined) {
    queryId = parseInt(id);
  }

  useEffect;

  const tempData = [
    {
      name: "hello",
      id: 0,
      userTicketCode: "xxasadfasfdasdfasdfasdfasdfasdfa",
      attendance: false,
    },
    {
      name: "hi",
      id: 1,
      userTicketCode: "x543",
      attendance: true,
    },
    {
      name: "steve",
      id: 2,
      userTicketCode: "asdf",
      attendance: true,
    },
    {
      name: "alex",
      id: 3,
      userTicketCode: "gjhg",
      attendance: true,
    },
    {
      name: "gury",
      id: 4,
      userTicketCode: "asfd",
      attendance: false,
    },
    {
      name: "jack",
      id: 5,
      userTicketCode: "vbn",
      attendance: false,
    },
    {
      name: "yeet",
      id: 6,
      userTicketCode: "myname",
      attendance: false,
    },
  ];

  function filterDataByuserTicketCodeOrName(
    data: DataItem[],
    searchTerm: string
  ): DataItem[] {
    return data.filter((item) =>
      // item.userTicketCode.toLowerCase().includes(searchTerm.toLowerCase()) || // UNCOMMENT THIS
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  const [resulta, setResult] = useState("");
  const [curr, setCurr] = useState("");
  const [filtered, setFiltered] = useState(tempData);
  const [serverData, setServerData] = useState(tempData);

  const { ref } = useZxing({
    onDecodeResult(result) {
      if (resulta != result.getText()) {
        const filteredData = filterDataByuserTicketCodeOrName(
          serverData,
          result.getText()
        );
        setResult(result.getText());
        setCurr(result.getText());
        setFiltered(filteredData);
      }
    },
  });

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    const filteredData = filterDataByuserTicketCodeOrName(
      serverData,
      e.target.value
    );
    setCurr(e.target.value);
    setFiltered(filteredData);
  }

  function updateCheckbox(e: React.ChangeEvent<HTMLInputElement>, id: number) {
    
    let tempObj = serverData.find((o) => o.id === id);
    if (tempObj) {
      let index = serverData.indexOf(tempObj);
      tempObj.attendance = !tempObj.attendance;
      serverData.fill(tempObj, index, index++);
      // send data to backend from here send ticket ID and attendance
      console.log(tempObj.id);
      console.log(tempObj.attendance);
      onCheckboxClicked({ peopleTicketId: tempObj.id, attendance:  tempObj.attendance} )
    }
    
  }

  //dumb shit

  const onSubmit = async (params: any) => {
    try {
      const response = await axios.get("/api/event/attendance", {
        params,
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        // Form Submission Successful
        console.log(response.data.eventTickets);
        setServerData(response.data.eventTickets);
        // console.log(serverData)
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log("error");
    }
  };

  const onCheckboxClicked = async (data : {peopleTicketId: number, attendance: boolean}) => {
    try {
      const response = await axios.patch("/api/event/attendance", {
        headers: {
          "Content-Type": "application/json",
        },
        data,
      });
      if (response.status === 200) {
        // Form Submission Successful
        console.log(response);
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <div className="from-AUIS-dark-teal to-AUIS-teal min-h-[calc(100vh)] bg-gradient-to-b">
      {navbar}
      <button onClick={() => onSubmit({ eventId: queryId })}>
        THIS IS A BUTTON
      </button>
      <h1 className="text-center text-white">
        Attendance updated successfully
      </h1>
      <h1 className="text-center text-white">Last Scanned: {resulta}</h1>
      <div className="flex items-center justify-center">
        <video className="w-[40rem] py-2" ref={ref} />
      </div>
      <div className="flex items-center justify-center">
        <input
          type="text"
          placeholder="Search Name/Ticket Number"
          onChange={(e) => handleOnChange(e)}
          value={curr}
          className="input mx-2 flex w-full max-w-[40rem] items-center justify-center rounded-xl border px-3 py-2 text-lg leading-tight shadow focus:outline-none"
        />
      </div>
      <div>
        <div className="m-2 rounded-lg  flex items-center justify-center text-white">
          <div className="grid grid-cols-3 max-w-[40rem] grid-rows-1">
            <div className="text-center text-lg">Name</div>

            <div className="text-center text-lg">Ticket Id</div>
            <div className="text-center text-lg">Attendance</div>
          </div>
        </div>
        <div className="pb-2 flex items-center justify-center">
          <div className="m-2 max-h-64 overflow-y-scroll max-w-[40rem] rounded-lg bg-white">
            {filtered.map((data, index) => {
              return (
                <div key={data.id} className="">
                  <div
                    className={`grid grid-cols-3 grid-rows-1 py-2 ${index % 2 == 1 ? "bg-AUIS-teal bg-opacity-10" : "bg-white"}`}
                  >
                    <div className="break-words text-center">{data.name}</div>
                    <div className="break-all text-center">
                      {data.userTicketCode}
                    </div>
                    <div className="flex items-center justify-center">
                      <input
                        type="checkbox"
                        className="accent-AUIS-teal scale-150"
                        defaultChecked={data.attendance}
                        // checked={data.attendance}
                        onChange={(e) => updateCheckbox(e, data.id)}
                      ></input>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AttendanceScreen;
