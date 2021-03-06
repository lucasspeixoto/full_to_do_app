import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../../../pages/Home";
import QrCode from "../../../pages/QrCode";
import Task from "../../../pages/Task";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/task' element={<Task />} />
        <Route path='/task/:id' element={<Task />} />
        <Route path='/qrcode' element={<QrCode />} />
      </Routes>
    </BrowserRouter>
  );
};
