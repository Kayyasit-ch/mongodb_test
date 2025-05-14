import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import './css/update.css';

const UpdateEmployee = () => {
    const { name } = useParams(); // ดึง name จาก URL
    const [salary, setSalary] = useState("");
    const [address, setAddress] = useState("");
    const [general, setGeneral] = useState({ weight: "", height: "", gender: "" });
    const [social, setSocial] = useState([]);
    const [department, setDepartment] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    // เมื่อเปิดหน้าแก้ไขจะต้องโหลดข้อมูลพนักงานมาแสดงในฟอร์ม
    useEffect(() => {
        const fetchEmployeeData = async () => {
            try {
                const res = await fetch(`http://localhost:3000/api/employee/${name}`);
                const data = await res.json();
                setSalary(data.salary || "");
                setAddress(data.address || "");
                setGeneral(data.general || { weight: "", height: "", gender: "" });
                setSocial(data.social || []);
                setDepartment(data.department || "");
            } catch (err) {
                setError("ไม่สามารถโหลดข้อมูลพนักงานได้");
            }
        };
        fetchEmployeeData();
    }, [name]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess(false);

        try {
            const res = await fetch(`http://localhost:3000/api/update-employee/${name}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    salary,
                    address,
                    general,
                    social,
                    department,
                }),
            });

            if (!res.ok) {
                throw new Error("ไม่สามารถอัปเดตข้อมูลพนักงานได้");
            }

            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
            }, 2000);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>แก้ไขข้อมูลพนักงาน: {name}</h1>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <h3 className="label">เงินเดือน</h3>
                <input
                    placeholder="เงินเดือน"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                />
                </div>
                <div className="input-group">
                    <h3 className="label">ที่อยู่</h3>
                <input
                    placeholder="ที่อยู่"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
                </div>
                    <div className="input-group">
                    <h3 className="label">น้ำหนัก</h3>

                <input
                    placeholder="น้ำหนัก"
                    value={general.weight}
                    onChange={(e) => setGeneral({ ...general, weight: e.target.value })}
                />
                </div>
                <div className="input-group">
                <h3 className="label">ส่วนสูง</h3>
                <input
                    placeholder="ส่วนสูง"
                    value={general.height}
                    onChange={(e) => setGeneral({ ...general, height: e.target.value })}
                />
                </div>
                <div className="input-group">
                    <h3 className="label">เพศ</h3>
                <select
                    value={general.gender}
                    onChange={(e) => setGeneral({ ...general, gender: e.target.value })}
                >
                    <option value="">เพศ</option>
                    <option value="male">ชาย</option>
                    <option value="female">หญิง</option>
                    <option value="other">อื่นๆ</option>
                </select>
                </div>
                <div className="input-group">
                    <h3 className="label">Social</h3>
                <input
                    placeholder="Social (คั่นด้วย ,)"
                    value={social.join(",")}
                    onChange={(e) => setSocial(e.target.value.split(","))}
                />
                </div>
                <div className="input-group">
                    <h3 className="label">แผนก</h3>
                <input
                    placeholder="แผนก"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                />
                </div>

                <button type="submit" disabled={loading} className="btd">
                    {loading ? "กำลังส่ง..." : "แก้ไขข้อมูลพนักงาน"}
                </button>
            </form>

            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>แก้ไขข้อมูลพนักงานเรียบร้อยแล้ว</p>}
        </div>
    );
};

export default UpdateEmployee;
