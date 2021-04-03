import React, { useEffect, useState } from "react";
import {
  Card,
  Accordion,
  Button,
  OverlayTrigger,
  Row,
  Tooltip,
  Col,
  Breadcrumb,
} from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import sub from "../../../../config/sub.png";

import { getAllAreas, deleteAreaItem } from "../../../../services/AreaServices";
import {
  defaultAreaTreeAction,
  getAllAreatAction,
  getAllNatureAction,
  getOneAreaAction,
} from "../../../../actions/area";
import AddAreaTreeModal from "./AddAreaTreeModal";
import EditAreaTreeModal from "./EditAreaTreeModal";
import { loading } from "../../../../actions/loading";
import language from "../../../../config/language.json";
import SearchAreaModal from "./SearchAreaModal";

const FindAll = () => {
  let lan = { ...language[0] };
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const [show, setShow] = useState(false);

  const [showUpdate, setShowUpdate] = useState(false);
  const handleCloseUpdate = () => setShowUpdate(false);
  const handleShowUpdate = () => setShowUpdate(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [open, setOpen] = useState(false);
  const [arr, setArr] = useState([]);
  const area = useSelector((state) => state.areas);

  const [showSearchModal, setShowSearchModal] = useState(false);
  const handleShowSearchModal = () => setShowSearchModal(true);
  const handleCloseSearchModal = () => setShowSearchModal(false);

  const handleToggle = async (id, item) => {
    if (item.isOpen) {
      let icon = document.getElementById(id);
      let counter = 0;
      setArr([]);

      area.forEach((element, index) => {
        if (index <= area.indexOf(item)) {
          arr.push(element);
        } else {
          if (element.lvl <= item.lvl) {
            counter += 1;
          }
          if (counter > 0) {
            arr.push(element);
          } else {

          }
        }
      });

      icon.classList.toggle("active-rotate");
      dispatch(getAllAreatAction(arr));
      item.isOpen = false;
    } else {
      let icon = document.getElementById(id);

      dispatch(loading(true));
      const b = await getAllAreas(id, token);
      if (b.data.result === "success") {
        dispatch(loading(false));
        let len = b.data.data.length;

        setArr([]);

        for (let index = 0; index < area.length; index++) {
          arr.push(area[index]);
          if (len > 0) {
            if (arr[index].areaId == b.data.data[0].parentId) {
              for (let i = 0; i < len; i++) {
                arr.push(b.data.data[i]);
              }
            }
          }
        }

        dispatch(getAllAreatAction(arr));
      } else {
        dispatch(loading(false));
        toast.error("مشکلی پیش آمده است");
      }
      icon.classList.toggle("active-rotate");

      item.isOpen = true;
    }
  };
   // refresh page
   function refreshPage(){ 
    window.location.reload(); 
}

  useEffect(async () => {
    dispatch(loading(true));
    const a = await getAllAreas(0, token);
    if (a.data.result === "success") {
      dispatch(loading(false));
    }
    dispatch(getAllAreatAction(a.data.data));
    dispatch(getAllNatureAction(token));
  }, []);

  const [showAddZero, setShowAddZero] = useState(false);
  const handleShowAddZero = () => {
    setShowAddZero(true);
  };
  const handleCloseAddZero = () => setShowAddZero(false);

  const addTreeZeroItem = async () => {
    await dispatch(defaultAreaTreeAction());
    handleShowAddZero();
  };

  const deleteItem = async (id) => {
    const btndelete = window.confirm("آیا واقعا میخواهید این گزینه پاک شود ؟");
    console.log(id);
    if (btndelete === true) {
      let del = await deleteAreaItem(id, token);
      console.log(del);
      if (del.data.result == "success") {
        const d = area.filter((word) => word.areaId !== id);

        dispatch(getAllAreatAction(d));
        toast.success(" با موفقیت حذف شد");
      } else {
        toast.error(`${del.data.faultMessage} `);
      }
    }
  };

  const addTreeItem = async (id) => {
    console.log(id);
    dispatch(getOneAreaAction(id, token));
    handleShow();
  };

  const UpdateTreeItem = async (id) => {
    await dispatch(getOneAreaAction(id, token));
    handleShowUpdate();
  };

  return (
    <div className="p-4">
      <Row>
        <Col md={6}>
          <h1>{lan.menu2_1_2}</h1>
        </Col>
        <Col md={6} className="table-bread">
          <Breadcrumb>
            <Breadcrumb.Item active> {lan.menu2} </Breadcrumb.Item>
            <Breadcrumb.Item active> {lan.menu2_1}</Breadcrumb.Item>
            <Breadcrumb.Item onClick={refreshPage}> {lan.menu2_1_2}</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>
      <div className="box">
        <Row className="align-items-center p-3">
          <Col md={6} className="text-right">
            {area.length}
            <span className="mx-1"></span>
            نتیجه یافت شد
          </Col>
          <Col md={6} className="text-right">
            <Button
              className="mx-2 dark-blue"
              onClick={() => addTreeZeroItem()}
            >
              <i className="fa fa-plus"></i>
            </Button>
            <Button
              className="mx-2 dark-blue"
              onClick={() => handleShowSearchModal()}
            >
              <i class="fas fa-search"></i>
            </Button>
          </Col>
        </Row>
        <div className="card my-card-head">
          <div className="card-header ">
            <Row>
              <Col md={4}>{lan.common_basicInfo_area_title}</Col>
              <Col md={4}>{lan.common_basicInfo_area_description}</Col>
              <Col md={4}></Col>
            </Row>
          </div>
        </div>
        <Accordion>
          {area.map((item) => {
            return (
              <Card key={item.areaId}>
                <Card.Header>
                  <Row>
                    <Col md={4}>
                      {" "}
                      <span style={{ marginRight: `${item.lvl}em` }}></span>
                      {(item.lvl > 1) ? (
                        <>
                          <span>
                            <img className="" src={sub} alt="Logo" />
                          </span>
                          <i
                            id={item.areaId}
                            onClick={() => handleToggle(item.areaId, item)}
                            aria-controls={item.areaId}
                            aria-expanded={open}
                            className="fa fa-caret-left mr-3 cursor"
                          ></i>
                        </>
                      ) : (
                        <>
                          <i
                            id={item.areaId}
                            onClick={() => handleToggle(item.areaId, item)}
                            aria-controls={item.areaId}
                            aria-expanded={open}
                            className="fa fa-caret-left mr-3 cursor"
                          ></i>
                        </>
                      )}
                      {/* <span  onClick={() => handleToggle(item.areaId, item)}>></span> */}
                      {item.title}
                    </Col>
                    <Col md={4}>{item.description}</Col>

                    <Col md={4} className="text-right">
                      <OverlayTrigger
                        key="top"
                        placement="top"
                        overlay={
                          <Tooltip id="tooltip-top">
                            {lan.common_basicInfo_area_add}
                          </Tooltip>
                        }
                      >
                        <i
                          className="fa fa-plus detail-btn"
                          onClick={() => addTreeItem(item.areaId)}
                        ></i>
                      </OverlayTrigger>
                      <OverlayTrigger
                        key="top"
                        placement="top"
                        overlay={
                          <Tooltip id="tooltip-top">
                            {lan.common_basicInfo_area_edit}
                          </Tooltip>
                        }
                      >
                        <i
                          className="fa fa-edit edit-btn"
                          onClick={() => UpdateTreeItem(item.areaId)}
                        ></i>
                      </OverlayTrigger>
                      <OverlayTrigger
                        key="top"
                        placement="top"
                        overlay={
                          <Tooltip id="tooltip-top">
                            {lan.common_basicInfo_area_delete}
                          </Tooltip>
                        }
                      >
                        <i
                          className="fa fa-trash delete-btn"
                          onClick={() => deleteItem(item.areaId)}
                        ></i>
                      </OverlayTrigger>
                    </Col>
                  </Row>
                </Card.Header>
              </Card>
            );
          })}
        </Accordion>
      </div>

      <AddAreaTreeModal close={handleCloseAddZero} show={showAddZero} />
      <SearchAreaModal close={handleCloseSearchModal} show={showSearchModal} />
      <AddAreaTreeModal close={handleClose} show={show} />
      <EditAreaTreeModal close={handleCloseUpdate} show={showUpdate} />
    </div>
  );
};

export default FindAll;
