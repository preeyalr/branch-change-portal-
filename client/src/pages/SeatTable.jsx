import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
function SeatTable() {
  const [seats, setSeats] = useState([]);
const navigate = useNavigate();
  const fetchSeats = async () => {
    try {
      const res = await API.get("/admin/seats");
      setSeats(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchSeats();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-800 text-white p-6">
<button
  onClick={() => navigate("/admin")}
  className="absolute top-5 left-5 bg-white text-indigo-600 px-4 py-2 rounded-lg shadow-md hover:bg-indigo-100 transition"
>
  ← Home
</button>
      <h1 className="text-3xl mb-6 text-center">
        Seat Matrix 
      </h1>

      <div className="bg-white/10 p-6 rounded-xl">

        <table className="w-full text-center border-collapse">

          <thead>
            <tr className="border-b border-white/30">
              <th className="p-2">Branch</th>
              <th className="p-2">General</th>
              <th className="p-2">OBC</th>
              <th className="p-2">SC</th>
              <th className="p-2">ST</th>
            </tr>
          </thead>

          <tbody>
            {seats.map((seat) => (
              <tr key={seat._id} className="border-b border-white/10">

                <td className="p-2">{seat.branch}</td>
                <td className="p-2">{seat.seats.General}</td>
                <td className="p-2">{seat.seats.OBC}</td>
                <td className="p-2">{seat.seats.SC}</td>
                <td className="p-2">{seat.seats.ST}</td>

              </tr>
            ))}
          </tbody>

        </table>

      </div>

    </div>
  );
}

export default SeatTable;