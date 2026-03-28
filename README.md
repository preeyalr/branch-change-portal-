## 📌 **Branch Change Portal (MERN Stack Project)**

**Branch Change Portal** is a full-stack web application developed using the **MERN stack (MongoDB, Express.js, React.js, Node.js)** that automates the process of student branch change allocation in academic institutions.

The system allows students to register, log in, and submit a single application with multiple branch preferences along with their academic details such as CGPA and category. Each student can prioritize branches, and the system ensures fair allocation based on predefined rules.

On the admin side, the portal provides a dedicated dashboard to manage vacant seats, view student applications, and execute the branch allocation process. The allocation logic is designed to simulate real-world counselling systems, where students are sorted based on CGPA (merit), and seats are allotted according to preference order and category-based reservation policies.

The system supports dynamic seat reallocation—when a student is allotted a new branch, their previously occupied seat becomes available for others. It also implements a fallback mechanism where reserved category students can opt for general category seats if reserved seats are unavailable, ensuring optimal seat utilization.

Additionally, the platform includes features such as secure authentication using JWT, role-based access control (admin/student), real-time application status tracking, and an interactive admin panel for seat management.

---

## 🚀 **Key Features**

* 🔐 Authentication & Authorization (JWT-based)
* 👨‍🎓 Student Portal (Register, Login, Apply)
* 🧠 Smart Allocation
