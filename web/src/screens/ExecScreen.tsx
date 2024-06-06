import { Props } from "../types/types";

function ExecScreen({ execs }: Props) {
  return (
    <div>
      <h1>Meet the Execs</h1>
      <div className="grid grid-cols-2 gap-10">
        {execs.map((exec) => (
          <div key={exec.id} className="bg-white text-black p-5 rounded-lg">
            <div className="flex items-center">
              <img
                className="rounded-full max-w-40 max-h-40 mr-4"
                src={exec.image}
                alt="exec image"
              />
              <div>
                <h1 className="text-xl font-bold">{exec.name}</h1>
                <h2 className="text-lg">{exec.position}</h2>
                <p className="text-base">{exec.bio}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExecScreen;
