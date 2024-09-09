"use client";

import { useState, useRef, useEffect, ChangeEvent } from "react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Target } from "lucide-react";

export default function Countdown () {
    const [duration, setDuration] = useState<number | string>(" ");
    const [timeLeft, setTimeLeft] = useState<number>(0);
    const [isActive, setIsActive] = useState<boolean>(false);
    const [isPaused, setIsPaused] = useState<boolean>(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);



    const handleSetDuration = (): void => {
        if(typeof duration === 'number' && duration >0){
            setTimeLeft(duration);
            setIsActive(false);
            setIsPaused(false);
            if(timerRef.current){
                clearInterval(timerRef.current);
            }
        }
    };




    const handleStart = (): void => {
        if(timeLeft > 0){
            setIsActive(true);
            setIsPaused(false);
        }
    };


    const handlePaused = (): void =>{
        if(isActive){
            setIsPaused(true);
            setIsActive(false);
            if(timerRef.current){
                clearInterval(timerRef.current);
        }
        
    }
};


    const handleReset = (): void =>{
        setIsActive(false);
        setIsPaused(false);
        setTimeLeft(typeof duration === "number"? duration : 0);
        if(timerRef.current){
            clearInterval(timerRef.current);
        }
    };



    useEffect (() => {
        if(isActive && !isPaused){
            timerRef.current = setInterval(() => {
                setTimeLeft((prevTime) => {
                    if(prevTime <= 1){
                        clearInterval(timerRef.current!);
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);
        }
        return () =>{
            if(timerRef.current){
                clearInterval(timerRef.current)
            }
        };
    }, [isActive, isPaused]);



    const formatTime = (time: number): string => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
    };

    const handleDurationChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setDuration(Number(e.target.value)|| "");
    };

    

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
          <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
            <h1 className="text-3xl font-bold text-center mb-6">Countdown Timer</h1>
            <div className="flex justify-between items-center mb-4">
              <input
                type="number"
                placeholder="Enter duration (seconds)"
                value={duration === " " ? "" : duration}
                onChange={handleDurationChange}
                className="border border-gray-300 rounded-lg px-4 py-2 w-full"
              />
              <button
                onClick={handleSetDuration}
                className="ml-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg transition duration-300"
              >
                Set
              </button>
            </div>
            <div className="text-center text-4xl font-bold mb-6 text-gray-700">
              {formatTime(timeLeft)}
            </div>
            <div className="flex justify-between">
              <button
                onClick={handleStart}
                className={`${
                  isActive ? "bg-gray-300" : "bg-green-500 hover:bg-green-600"
                } text-white font-semibold px-4 py-2 rounded-lg transition duration-300`}
                disabled={isActive}
              >
                Start
              </button>
              <button
                onClick={handlePaused}
                className={`${
                  isPaused ? "bg-gray-300" : "bg-yellow-500 hover:bg-yellow-600"
                } text-white font-semibold px-4 py-2 rounded-lg transition duration-300`}
              >
                Pause
              </button>
              <button
                onClick={handleReset}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg transition duration-300"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      );
    };







