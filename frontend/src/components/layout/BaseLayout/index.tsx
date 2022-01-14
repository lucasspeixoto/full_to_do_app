import React, { ReactNode } from "react";
import Footer from "../Footer";
import Header from "../Header";

import * as S from "./styles";

interface BaseLayoutProps {
  children?: ReactNode;
}

const BaseLayout: React.FC<BaseLayoutProps> = ({ children }) => {
  return (
    <S.Container>
      <Header />
      {children}
      <Footer />
    </S.Container>
  );
};

export default BaseLayout;
