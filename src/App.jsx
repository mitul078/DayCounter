
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
  return (
    <div className='container'>
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
                let status = '';
                if (d.month < currentMonth) status = "Completed";
                else if (d.month > currentMonth) status = "Not Completed"
                else {
                  if (d.day < currentDay) status = "Completed"
                  else if (d.day === currentDay) status = "Running...."
                  else status = "Not Completed"

                }
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
    </div>
  )
}


export default App

