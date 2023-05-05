import { useState, useEffect } from "react";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
function DownArrow() {
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleDownArrowClick = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth"
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className="down-arrow"
      onClick={handleDownArrowClick}
      style={{
        display: scrollPosition === 0 ? "block" : "none",
        position: "absolute",
        bottom: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        border: "3px solid white",
        cursor: "pointer"
      }}
    >
        <ArrowDownwardIcon style={{color:"white",margin:'0.8vh'}} ></ArrowDownwardIcon>
    </div>
  );
}

export default DownArrow;
