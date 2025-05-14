import React, { useState } from "react";
import './css/add.css';

const AddEmployee = () => {
    const [name, setName] = useState("");
    const [salary, setSalary] = useState("");
    const [address, setAddress] = useState("");
    const [general, setGeneral] = useState({ weight: "", height: "", gender: "" });
    const [social, setSocial] = useState([]);
    const [department, setDepartment] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const res = await fetch("http://localhost:3000/api/add-employee", {
                method: "POST",
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
                throw new Error("ไม่สามารถเพิ่มพนักงานได้");
            }

            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
                window.location.reload();
            }, 2000);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="add-container">
            <h1>เพิ่มพนักงาน</h1>
            <form className="add-form" onSubmit={handleSubmit}>
                <input placeholder="ชื่อ" value={name} onChange={(e) => setName(e.target.value)} />
                <input placeholder="เงินเดือน" value={salary} onChange={(e) => setSalary(e.target.value)} />
                <input placeholder="ที่อยู่" value={address} onChange={(e) => setAddress(e.target.value)} />
                <input
                    placeholder="น้ำหนัก"
                    value={general.weight}
                    onChange={(e) => setGeneral({ ...general, weight: e.target.value })}
                />
                <input
                    placeholder="ส่วนสูง"
                    value={general.height}
                    onChange={(e) => setGeneral({ ...general, height: e.target.value })}
                />
                <select
                    value={general.gender}
                    onChange={(e) => setGeneral({ ...general, gender: e.target.value })}
                >
                    <option value="">เพศ</option>
                    <option value="male">ชาย</option>
                    <option value="female">หญิง</option>
                    <option value="other">อื่นๆ</option>
                </select>
                <input
                    placeholder="Social (คั่นด้วย ,)"
                    value={social.join(",")}
                    onChange={(e) => setSocial(e.target.value.split(","))}
                />
                <input
                    placeholder="แผนก"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                />
                <button type="submit" disabled={loading}>
                    {loading ? "กำลังส่ง..." : "เพิ่มพนักงาน"}
                </button>
            </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>เพิ่มพนักงานเรียบร้อยแล้ว</p>}
        </div>
    );
};

export default AddEmployee;
