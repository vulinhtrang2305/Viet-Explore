import React, { useEffect, useState } from "react";
import AppContext from "./Context";
import axios from "axios";

function AppProvider({ children }) {
  const [spot, setSpot] = useState([]);
  const [category, setCategory] = useState([]); 
  // const [categorySearch, setCategorySearch] = useState([]); 
  // const [searchName, setSearchName] = useState(""); 
  // const [genderFilter, setGenderFilter] = useState({}); 

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const resDepartment = await axios.get("http://localhost:9999/spots");
      setSpot(resDepartment.data.data);

      const resCategory = await axios.get("http://localhost:9999/categories");
      setCategory(resCategory?.data?.data);
      

    } catch (error) {
      console.log(error);
    }
  };

  // const addEmployee = async (newEmployee) => {
  //   try {
  //     // Kiểm tra dữ liệu trước khi gửi
  //     console.log("Adding employee:", newEmployee);

  //     const response = await axios.post("http://localhost:9996/attendees", {
  //       ...newEmployee,
  //       workshopId: Number(newEmployee.workshopId), // Đảm bảo workshopId là số
  //     });

  //     // Kiểm tra phản hồi từ API
  //     console.log("Employee added:", response.data);

  //     // Cập nhật lại state employee với nhân viên mới
  //     setEmployee((prevEmployees) => [...prevEmployees, response.data]);
  //   } catch (error) {
  //     console.log("Error adding employee:", error);
  //   }
  // };




  // const addEmployeeToTeam = (employee, quantity) => {
  //   const existingMember = team.find(member => member.id == employee.id);
  //   if (existingMember) {
  //     setTeam(team.map(member =>
  //       member.id == employee.id ? { ...member, quantity: member.quantity + quantity } : member
  //     ));
  //   } else {
  //     setTeam([...team, { ...employee, quantity }]);
  //   }
  // };


  // const removeEmployeeFromTeam = (id) => {
  //   setTeam(team.filter(member => member.id != id));
  // };


  const data = {
    category, setCategory,
    spot, setSpot,
  };

  return (
    <AppContext.Provider value={data}>
      {children}
      {/* app  */}
    </AppContext.Provider>
  );
}

export default AppProvider;
