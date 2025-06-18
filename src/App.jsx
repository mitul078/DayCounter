import InfiniteScroll from 'react-infinite-scroll-component';
import { useState, useEffect } from 'react';

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
  ];

  const [visibleCount, setVisibleCount] = useState(20);
  const [restartStatus, setRestartStatus] = useState({}); // index-based object

  const loadMore = () => {
    setTimeout(() => {
      setVisibleCount(prev => prev + 20);
    }, 500);
  };

  const visibleDays = days.slice(0, visibleCount);

  const formatLabel = (day, month) => {
    const date = new Date(2025, month, day);
    return new Intl.DateTimeFormat('en-GB', {
      day: 'numeric',
      month: 'long',
    }).format(date);
  };

  const getOriginalStatus = (day, month) => {
    if (month < currentMonth) return "Completed";
    if (month > currentMonth) return "Not Completed";
    if (day < currentDay) return "Completed";
    if (day === currentDay) return "Running....";
    return "Not Completed";
  };

  const handleCheckboxChange = (index) => {
    setRestartStatus(prev => {
      const updated = {
        ...prev,
        [index]: !prev[index],
      };
      localStorage.setItem("restartStatus", JSON.stringify(updated)); // Save to localStorage
      return updated;
    });
  };

  const getFinalStatus = (index, day, month) => {
    return restartStatus[index] ? "Restarted" : getOriginalStatus(day, month);
  };

  const Completed = days.filter(d => getOriginalStatus(d.day, d.month) === "Completed").length;

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("restartStatus");
    if (stored) {
      setRestartStatus(JSON.parse(stored));
    }
  }, []);

  return (
    <InfiniteScroll
      dataLength={visibleDays.length}
      next={loadMore}
      hasMore={visibleDays.length < days.length}
      loader={<p style={{ textAlign: 'center', color: "gray", fontSize: "4rem" }}>Loading ... Wait Please</p>}
    >
      <div className='container'>
        <div className="image">
          <img src="https://images.unsplash.com/photo-1504805572947-34fad45aed93?q=80&w=1170&auto=format&fit=crop" alt="" />
        </div>

        <div className="box">
          <div className="left">
            <h1>DAYS</h1>
            <div className="data">
              {visibleDays.map((d, i) => (
                <div key={i} className="day-item">
                  <p>{formatLabel(d.day, d.month)}</p>
                  <input
                    type="checkbox"
                    checked={!!restartStatus[i]}
                    onChange={() => handleCheckboxChange(i)}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="right">
            <h1>Status</h1>
            <div className="data">
              {visibleDays.map((d, i) => {
                const status = getFinalStatus(i, d.day, d.month);
                const color =
                  status === "Completed" ? "#98CD00" :
                    status === "Running...." ? "#FCEF91" :
                      status === "Restarted" ? "dodgerblue" :
                        "tomato";

                return <p key={i} style={{ color }}>{status}</p>;
              })}
            </div>
          </div>
        </div>

        <div className="info">
          <h1>Total: {days.length} Days</h1>
          <h1>Completed: {Completed}</h1>

          <div className="checkData">
            <h2>Restarted Dates</h2>
            {Object.entries(restartStatus)
              .filter(([_, isChecked]) => isChecked)
              .map(([index]) => {
                const d = days[+index];
                return (
                  <p key={index}>
                    {formatLabel(d.day, d.month)}
                  </p>
                );
              })}
          </div>
        </div>
      </div>
    </InfiniteScroll>
  );
};

export default App;
