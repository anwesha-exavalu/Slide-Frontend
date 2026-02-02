import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { CreateQuote } from "styles/pages/CreateQuote/index";
import { Button } from "antd";
import { Container } from "styles/pages/CreateQuote";
import AutomaticBusinessSection from "pages/AutomaticQuote/AutomaticBusinessSection";
import AutomaticInsuredInformation from "./AutomaticInsuredInformation";
import AutomaticVehicleDetails from "./AutomaticVehicleDetails";
import AutomaticDriverDetails from "./AutomaticDriverDetails";
import { AttachButton } from "styles/pages/Documents";
import SuccessMessageModal from "components/PopupModal/SuccessMessageModal";
import SaveApplication from "assets/images/saveApplication.png";
import useMetaData from "context/metaData";

const AutomaticCommAuto = () => {
  const {theme}=useMetaData();
  const [open, setOpen] = useState(false);
  const { state } = useLocation();

  const setHandleOpen = () => {
    setOpen(true);
  };

  return (
    <Container theme={theme}>
      <CreateQuote theme={theme}>
        <AutomaticInsuredInformation state={state} TabName="Comproperty" />
        <br />
        <br />
        <AutomaticVehicleDetails state={state} TabName="Comproperty" />
        <br />
        <AutomaticDriverDetails state={state} TabName="Comproperty" />
        <br />
        <AutomaticBusinessSection state={state} TabName="Comproperty" />
        <br></br>
        <div>
          <AttachButton>
            <Button
              className="submitButton"
              type="primary"
              onClick={setHandleOpen}
            >
              Create Quote
            </Button>
          </AttachButton>
        </div>
        <br></br>
      </CreateQuote>
      <SuccessMessageModal
        open={open}
        setOpen={setOpen}
        icon={SaveApplication}
        message={"Quote Created Successfully"}
      />
    </Container>
  );
};

export default AutomaticCommAuto;
