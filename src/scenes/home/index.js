import React, { useEffect, useState } from "react";
import api from "../../services/api";

const Home = () => {
  const [availableUsers, setAvailableUsers] = useState();
  const [countUser, setCountUsers] = useState();
  const [countProject, setProject] = useState();
  async function getUser() {
    const { data } = await api.get("/user");
    
    setAvailableUsers(data);
    setCountUsers(data.length)
  }
  async function getProjects() {
    const res = await api.get("/project");
    setProject(res.data.length);
  }
  useEffect(() => {
    getUser();
    getProjects();

  }, []);

  return (
    <div className="px-2 md:!px-8 flex flex-col md:flex-row gap-5 mt-5">
      <div className="flex-1 mb-[10px]">
      <div className="overflow-x-auto">
      <div className="flex justify-center py-10 gap-10">
  <UserCard name="Users" count={countUser}  />
  <UserCard name="Projects" count= {countProject} />
</div>

        </div>
        <h2 className="text-[22px] font-semibold mb-4">Available</h2>
        
        {availableUsers?.map((user) => (
          <div key={user._id} className="bg-white mb-[10px] rounded-lg shadow-sm flex gap-4 p-3">
            <img src={user.avatar} alt="userlogo" className="rounded-full w-14 h-14" />
            <div>
              <h3 className="font-semibold text-lg mb-[3px]">{user.name}</h3>
              {/* <h3 className="text-[#676D7C] text-sm">{user.email}</h3> */}
              <h3 className="text-[#676D7C] text-sm">{user.job_title}</h3>
              <p className="text-[#676D7C] text-sm capitalize">{user.availability}</p>
            </div>
          </div>
        ))}
        {availableUsers?.length === 0 ? <span className="italic text-gray-600">No available users.</span> : null}
      </div>
    </div>
  );
};
const UserCard = ({ name , count }) => {
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-white hover:-translate-y-1 transition duration-100 shadow-sm ease-in cursor-pointer relative rounded-[16px] pb-4 overflow-hidden">
  <div className="flex flex-col flex-1 justify-center items-center">
    <div className="flex flex-col items-center text-center my-4 space-y-1 mx-5">
      <p className="font-semibold text-xl">{name}</p>
      <p className="font-semibold text-lg">{count}</p>
    </div>
  </div>
</div>

  
  );
};

export default Home;
