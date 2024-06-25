import React from "react";
import HeaderAfterLogin from '../components/HeaderAfterLogin';
import Footer from '../components/Footer';
import TransactionComp from "../components/TransactionComp";

const TransactionPage = (props) => {
  return (
    <div className="transactionPage">
      <HeaderAfterLogin />
      <TransactionComp/>
      <Footer />
    </div>
  );
};

export default TransactionPage;
