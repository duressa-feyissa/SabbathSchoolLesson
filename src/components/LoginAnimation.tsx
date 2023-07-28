import { Heading } from "@chakra-ui/react";
import { useState, useEffect } from "react";

const styles = {
  display: "inline-block",
  whiteSpace: "nowrap",
  overflow: "hidden",
  animation: "slide-in 2s linear",
  textTransform: "uppercase",
};

const job = ["Welcome to", "Sabbath School", "Admin Portal"];

const LoginAnimation = () => {
  const [currentJob, setCurrentJob] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentCharIndex < job[currentJob].length - 1) {
        setCurrentCharIndex((prevCharIndex) => prevCharIndex + 1);
      } else {
        setCurrentCharIndex(0);
        setCurrentJob((prevJob) => (prevJob + 1) % job.length);
      }
    }, 230);
    return () => clearInterval(interval);
  }, [currentJob, currentCharIndex]);

  return (
    <Heading
      style={styles && {}}
      fontSize="3rem"
      whiteSpace="nowrap"
      color={"#ffb400"}
      className="sliding-text"
    >
      {job[currentJob].slice(0, currentCharIndex + 1)}
    </Heading>
  );
};

export default LoginAnimation;
