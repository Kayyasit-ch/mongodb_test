import React, { useEffect, useState } from "react";
import './css/employees.css';

const Employees = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAPI = async () => {
            try {
                const res = await fetch('http://localhost:3000/api/employees');
                const data = await res.json();
                setEmployees(data);
                setLoading(false);
            } catch (err) {
                setError("เกิดข้อผิดพลาดในการโหลดข้อมูล");
                console.error('Error fetching data:', err);
                setLoading(false);
            }
        };
        fetchAPI();
    }, []);

    if (loading) return <p>กำลังโหลดข้อมูล...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div class='container'>
            <h1 class='text'> ข้อมูลพนักงาน</h1>
            <table border="1" cellPadding="10" class='table'>
                <thead>
                    <tr>
                        <th>ชื่อ</th>
                        <th>เงินเดือน</th>
                        <th>ที่อยู่</th>
                        <th>เพศ</th>
                        <th>แผนก</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
                        <tr key={employee._id}>
                            <td>{employee.name}</td>
                            <td>{employee.salary}</td>
                            <td>{employee.address}</td>
                            <td>{employee.general?.gender || '-'}</td>
                            <td>{employee.department}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Employees;
