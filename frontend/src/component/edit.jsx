import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './css/employees.css';

const handleDelete = async (name) => {
    try {
        const res = await fetch(`http://localhost:3000/api/delete-employee/${name}`, {
            method: "DELETE",
        });
        if (!res.ok) {
            throw new Error("ไม่สามารถลบพนักงานได้");
        }
        alert("ลบพนักงานสำเร็จ");
        window.location.reload(); // ถ้าอยากให้ smooth กว่านี้ ใช้ state update แทน reload ก็ได้
    } catch (err) {
        alert(err.message);
    }
};

const Showdata = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // ใช้ navigate จาก react-router-dom

    useEffect(() => {
        const fetchapi = async () => {
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
        fetchapi();
    }, []);

    if (loading) return <p>กำลังโหลดข้อมูล...</p>;
    if (error) return <p>{error}</p>;

    const handleEdit = (name) => {
        navigate(`/edit/${name}`); // นำทางไปยังหน้าแก้ไขพร้อมส่ง name
    };

    return (
        <div className="container">
            <h1 className="text">ข้อมูลพนักงาน</h1>
            <table border="1" cellPadding="10" className="table">
                <thead>
                    <tr>
                        <th>ชื่อ</th>
                        <th>เงินเดือน</th>
                        <th>ที่อยู่</th>
                        <th>เพศ</th>
                        <th>แผนก</th>
                        <th>ลบ</th>
                        <th>แก้ไข</th>
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
                            <td>
                                <button onClick={() => handleDelete(employee.name)}>ลบ</button>
                            </td>
                            <td>
                                <button onClick={() => handleEdit(employee.name)}>แก้ไข</button> {/* กดแล้วไปหน้า update */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Showdata;
