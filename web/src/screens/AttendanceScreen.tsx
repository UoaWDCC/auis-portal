import { useState } from "react";
import { useZxing } from "react-zxing";
import { UseZxingOptionsWithConstraints } from "react-zxing/lib/useZxing";

function AttendanceScreen({ navbar }: { navbar: JSX.Element }) {
  type DataItem = {
    name: string;
    id: number;
    ticketId: string;
    attendance: boolean;
  };

  const tempData = [
    {
      name: "hello",
      id: 0,
      ticketId: "xxasadfasfdasdfasdfasdfasdfasdfa",
      attendance: false,
    },
    {
      name: "hi",
      id: 1,
      ticketId: "x543",
      attendance: true,
    },
    {
      name: "steve",
      id: 2,
      ticketId: "asdf",
      attendance: true,
    },
    {
      name: "alex",
      id: 3,
      ticketId: "gjhg",
      attendance: true,
    },
    {
      name: "gury",
      id: 4,
      ticketId: "asfd",
      attendance: false,
    },
    {
      name: "jack",
      id: 5,
      ticketId: "vbn",
      attendance: false,
    },
    {
      name: "yeet",
      id: 6,
      ticketId: "myname",
      attendance: false,
    },
  ];

  function filterDataByTicketIdOrName(
    data: DataItem[],
    searchTerm: string
  ): DataItem[] {
    return data.filter(
      (item) =>
        item.ticketId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  const [resulta, setResult] = useState("");
  const [curr, setCurr] = useState("");
  const [filtered, setFiltered] = useState(tempData);

  const { ref } = useZxing({
    onDecodeResult(result) {
      if (resulta != result.getText()) {
        const filteredData = filterDataByTicketIdOrName(
          tempData,
          result.getText()
        );
        setResult(result.getText());
        setCurr(result.getText());
        setFiltered(filteredData);
      }
    },
  });

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    const filteredData = filterDataByTicketIdOrName(tempData, e.target.value);
    setCurr(e.target.value);
    setFiltered(filteredData);
  }

  function updateCheckbox(e: React.ChangeEvent<HTMLInputElement>, id: number) {
    let tempObj = tempData.find((o) => o.id === id);
    if (tempObj) {
      let index = tempData.indexOf(tempObj);
      tempObj.attendance = !tempObj.attendance;
      tempData.fill(tempObj, index, index++);
      // send data to backend from here send ticket ID and attendance
      console.log(tempObj.id);
      console.log(tempObj.attendance);
    }
  }

  return (
    <div className="from-AUIS-dark-teal to-AUIS-teal min-h-[calc(100vh)] bg-gradient-to-b">
      {navbar}
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
        <div className="m-2 rounded-lg text-white">
          <div className="grid grid-cols-3 grid-rows-1">
            <div className="text-center text-lg">Name</div>

            <div className="text-center text-lg">Ticket Id</div>
            <div className="text-center text-lg">Attendance</div>
          </div>
        </div>
        <div className="pb-2">
          <div className="m-2 max-h-64 overflow-scroll rounded-lg bg-white">
            {filtered.map((data, index) => {
              return (
                <div key={data.id} className="">
                  <div
                    className={`grid grid-cols-3 grid-rows-1 py-2 ${index % 2 == 1 ? "bg-AUIS-teal bg-opacity-10" : "bg-white"}`}
                  >
                    <div className="break-words text-center">{data.name}</div>
                    <div className="break-all text-center">{data.ticketId}</div>
                    <div className="flex items-center justify-center">
                      <input
                        type="checkbox"
                        className="scale-150"
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
