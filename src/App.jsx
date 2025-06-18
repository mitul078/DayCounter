
const App = () => {
  const date = new Date();
  const currentDay = date.getDate();
  const currentMonth = date.getMonth();
  const days = [
    ...Array.from({ length: 17 }, (_, i) => ({ day: i + 14, month: 5 })),
    ...Array.from({ length: 31 }, (_, i) => ({ day: i + 1, month: 6 })),
    ...Array.from({ length: 31 }, (_, i) => ({ day: i + 1, month: 7 })),
    ...Array.from({ length: 30 }, (_, i) => ({ day: i + 1, month: 8 })),
    ...Array.from({ length: 31 }, (_, i) => ({ day: i + 1, month: 9 })),
    ...Array.from({ length: 30 }, (_, i) => ({ day: i + 1, month: 10 })),
    ...Array.from({ length: 31 }, (_, i) => ({ day: i + 1, month: 11 })),
  ]


  const formatLabel = (day, month) => {
    const date = new Date(2025, month, day);
    return new Intl.DateTimeFormat('en-GB', {
      day: 'numeric',
      month: 'long',
    }).format(date);
  };

  const getStatus = (day, month) => {
    if (month < currentMonth) return "Completed";
    if (month > currentMonth) return "Not Completed";

    if (day < currentDay) return "Completed";
    if (day === currentDay) return "Running....";
    return "Not Completed";
  };

  const Completed = days.filter(d => getStatus(d.day, d.month) === "Completed").length;
  return (
    <div className='container'>
      <div className="image">
        <img src="https://plus.unsplash.com/premium_photo-1671512497719-173938f4d3a4?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
        <img src="https://plus.unsplash.com/premium_photo-1671512499810-ac5b5dd3bc2b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
        <img src="https://images.unsplash.com/photo-1468971050039-be99497410af?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
        <img src="https://images.unsplash.com/photo-1504805572947-34fad45aed93?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
      </div>
      
      <div className="box">
        <div className="left">
          <h1>DAYS</h1>
          <div className="data">
            {days.map((d, i) => (
              <p key={i} >{formatLabel(d.day, d.month)}</p>
            ))}
          </div>
        </div>
        <div className="right">
          <h1>Status</h1>
          <div className="data">
            {
              days.map((d, i) => {
                const status = getStatus(d.day, d.month)


                const color =
                  status === "Completed" ? "#98CD00" :
                    status === "Running...." ? "#FCEF91" : "tomato"

                return <p key={i} style={{ color }}>{status}</p>
              })
            }
          </div>
        </div>
      </div>
      <h1>Total: {days.length} Days</h1>
      <h1>Completed: {Completed}</h1>
    </div>
  )
}


export default App

