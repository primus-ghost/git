import { isEmpty, toInteger } from "lodash";
import React, { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";

import {
  Table,
  Button,
  Row,
  Col,
  Breadcrumb,
  OverlayTrigger,
  Tooltip,
  Accordion,
  Card,
  useAccordionToggle,
  AccordionContext,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { loading } from "../../../actions/loading";
import {
  getAllTreeBudgetingParentAction,
  parentIdTreeBudgetingAction,
  parentIdUpdateTreeBudgetingAction,
} from "../../../actions/TreeBudgetingAction";
import {
  deleteTreeBudgeting,
  getAllTreeBudgetingParent,
  getOneTreeBudgeting,
} from "../../../services/TreeBudgetingServices";
import ChevronLeft from "@material-ui/icons/ArrowBackIos";
import { green } from "@material-ui/core/colors";
import TreeBudgetingSubject from "./TreeBudgetingSubject";
import AddTreeBudgetingModal from "./AddTreeBudgetingModal";
import DtailTreeBudgetingModal from "./DtailTreeBudgetingModal";
import UpdateTreeBudgetingModal from "./UpdateTreeBudgetingModal";
import language from "../../../config/language.json";

function TreeBudgetingTable() {
  const dispatch = useDispatch();
  const lan = { ...language[0] };

  const [updateId, setUpdateId] = useState(0);
  const [state, setState] = useState();
  const [cId, setId] = useState();
  const [childState, setChildState] = useState();
  const [showAdd, setShowAdd] = useState(false);
  const [oneState, setOneState] = useState();

  // show/hide modal functions
  const handleCloseAdd = () => setShowAdd(false);
  const handleShowAdd = () => setShowAdd(true);

  const [mainAddModal, setMainAddModal] = useState(false);
  const handleMainCloseAdd = () => setMainAddModal(false);
  const handleMainShowAdd = () => setMainAddModal(true);

  const [show, setShow] = useState(false);
  // show/hide modal functions
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showDetail, setShowDetail] = useState(false);
  // show/hide modal functions
  const handleCloseDetail = () => setShowDetail(false);
  const handleShowDetail = () => setShowDetail(true);
  const handleDetails = async (id) => {
    setUpdateId(id);
    handleShowDetail();
  };

  useEffect(async () => {
    dispatch(loading(true));
    const { data } = await getAllTreeBudgetingParent(0);
    if (data.result === "success") {
      setState(data.data);
      dispatch(loading(false));
    }
  }, []);

  // function handleToggle(id, item) {
  //   let tags = document.getElementsByClassName("arrow");
  //   let tag = document.getElementById(id);

  //   state.map((i) => {
  //     if (item.isOpen) {
  //       let ind = state.findIndex(it => it.treeId == item.treeId);
  //       i.isOpen = false
  //       state[ind].isOpen = true
  //     }
  //   });

  //   for (let i = 0; i < tags.length; i++) {
  //     tags[i].classList.remove("active-rotate");
  //     //  tag.classList.add("active-rotate")
  //   }
  //   item.isOpen = !item.isOpen;
  //   console.log("item", item.isOpen)
  //   if (item.isOpen) {
  //     tag.classList.add("active-rotate");
  //   } else {
  //     tag.classList.remove("active-rotate");
  //   }
  //   console.log("state", state);
  // }

  function CustomToggle({ children, eventKey, id }) {
    const currentEventKey = useContext(AccordionContext);

    const decoratedOnClick = useAccordionToggle(eventKey, async () => {
      dispatch(parentIdTreeBudgetingAction(id));
      dispatch(loading(true));
      const { data } = await getAllTreeBudgetingParent(id);

      if (data.result === "success") {
        setChildState(data.data);
        dispatch(loading(false));
      }
    });

    const isCurrentEventKey = currentEventKey === eventKey;
    let classes = [
      "bg-transparent",
      "p-0",
      "border-0",
      "shadow-none",
      isCurrentEventKey && "active-rotate",
    ];
    return (
      <Button
        className={classes.join(" ")}
        onClick={() => {
          decoratedOnClick();
        }}
      >
        {children}
      </Button>
    );
  }
  const refreshPage = () => {
    window.location.reload();
  };
  const addTreeItem = async (id) => {
    setId(id);
    handleShowAdd();
  };

  const handleUpdates = async (id) => {
    setUpdateId(id);
    const { data } = await getOneTreeBudgeting(id);
    if (data.result === "success") {
      setOneState(data);
      handleShow();
    }
  };

  const addMainItem = () => {
    handleMainShowAdd();
  };
  function changeState(data) {
    let newState = [...state];
    let i = newState.findIndex((item) => item.treeId == data.data[0].treeId);
    newState[i] = data.data[0];
    console.log("newState", newState);

    setState(newState);
  }
  function upMainState(data) {
    setState([...state, ...data.data]);
  }

  function upState(data) {
    setChildState([...childState, ...data.data]);
  }

  const handleChildDelete = async (id, parentId) => {
    const a = window.confirm("آیا میخواهید این گزینه پاک شود ؟");
    if (a == true) {
      dispatch(loading(true));
      const { data } = await deleteTreeBudgeting(id);
      if (data.result === "success") {
        toast.success("با موفقیت حذف شد");
        const { data } = await getAllTreeBudgetingParent(parentId);
        if (data.result === "success") {
          setChildState(data.data);
          dispatch(loading(false));
        } else {
          toast.error(`${data.faultMessage}`);
        }
      }
    }
    console.log(id);
  };
  function upChildState(data) {
    // console.log("child new state" ,data)
    let newState = [...childState];
    let i = newState.findIndex((item) => item.treeId == data.data[0].treeId);
    newState[i] = data.data[0];
    setChildState(newState);
  }
  const handleDelete = async (id) => {
    const a = window.confirm("آیا میخواهید این گزینه پاک شود ؟");
    if (a == true) {
      const { data } = await deleteTreeBudgeting(id);
      if (data.result === "success") {
        dispatch(loading(true));
        const { data } = await getAllTreeBudgetingParent(0);
        if (data.result === "success") {
          setState(data.data);
          toast.success("با موفقیت حذف شد");
          dispatch(loading(false));
        } else {
          toast.error(`${data.faultMessage}`);
        }
      }
    }
  };

  return (
    <div className="p-4">
      <Row>
        <Col md={6}>
          <h1> منبع (درختواره بودجه) </h1>
        </Col>
        <Col md={6} className="table-bread">
          <Breadcrumb>
            <Breadcrumb.Item active> {lan.menu6} </Breadcrumb.Item>
            <Breadcrumb.Item active> {lan.menu6_2} </Breadcrumb.Item>
            <Breadcrumb.Item onClick={refreshPage}>
              {" "}
              {lan.menu6_2_1}{" "}
            </Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>
      <div className="box">
        <Row className="pb-4">
          <Col md={6} className="table-result text-right"></Col>
          <Col md={6} className="add-btn text-right">
            <Button
              className="dark-blue"
              onClick={() => {
                addMainItem();
              }}
            >
              <i className="fa fa-plus"></i>
            </Button>
            <AddTreeBudgetingModal
              close={handleMainCloseAdd}
              show={mainAddModal}
              id={0}
              updateState={(data) => upMainState(data)}
            />
            <Button
              variant="primary"
              className="mx-2 dark-blue"
              //   onClick={() => handleShowSearch()}
            >
              <i class="fas fa-search"></i>
            </Button>
          </Col>
        </Row>
        <div className="card my-card-head">
          <div className="card-header ">
            <Row>
              <Col md={6}> {lan.tree_budgeting_title} </Col>

              <Col className="th-fn" md={6}></Col>
            </Row>
          </div>
        </div>
        <Accordion>
          {!isEmpty(state) &&
            state.map((item) => (
              <Card key={item.treeId}>
                <Card.Header>
                  <Row>
                    <Col md={6}>
                      <CustomToggle eventKey={item.treeId} id={item.treeId}>
                        {/* <i
                          id={item.treeId}                        
                          className="fa fa-caret-left detail-btn arrow"
                        ></i> */}
                        <ChevronLeft
                          style={{
                            fontSize: 16,
                          }}
                        />
                      </CustomToggle>

                      <span className="mx-2"></span>
                      {item.title}
                    </Col>

                    <Col md={6} className="text-right">
                      <OverlayTrigger
                        key="top"
                        placement="top"
                        overlay={<Tooltip id="tooltip-top">افزودن</Tooltip>}
                      >
                        <i
                          className="fa fa-plus detail-btn"
                          onClick={() => addTreeItem(item.treeId)}
                        ></i>
                      </OverlayTrigger>
                      <OverlayTrigger
                        key="top"
                        placement="top"
                        overlay={<Tooltip id="tooltip-top">جزئیات</Tooltip>}
                      >
                        <i
                          className="fa fa-info detail-btn"
                          onClick={(id) => handleDetails(item.treeId)}
                        ></i>
                      </OverlayTrigger>
                      <OverlayTrigger
                        key="top"
                        placement="top"
                        overlay={<Tooltip id="tooltip-top">ویرایش</Tooltip>}
                      >
                        <i
                          className="fa fa-edit edit-btn"
                          onClick={(id) => {
                            handleUpdates(item.treeId);
                            dispatch(parentIdUpdateTreeBudgetingAction(0));
                          }}
                        ></i>
                      </OverlayTrigger>

                      <OverlayTrigger
                        key="top"
                        placement="top"
                        overlay={<Tooltip id="tooltip-top">حذف</Tooltip>}
                      >
                        <i
                          className="fa fa-trash delete-btn"
                          onClick={(id) => {
                            handleDelete(item.treeId);
                          }}
                        ></i>
                      </OverlayTrigger>
                    </Col>
                  </Row>
                </Card.Header>

                <Accordion.Collapse eventKey={item.treeId}>
                  <Card.Body>
                    <Card.Header>
                      <TreeBudgetingSubject
                        parentId={item.treeId}
                        delete={(id, parentId) =>
                          handleChildDelete(id, parentId)
                        }
                        newState={(data) => upChildState(data)}
                        childState={childState}
                        key={item.treeId}
                      />
                    </Card.Header>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            ))}
        </Accordion>
        <UpdateTreeBudgetingModal
          close={handleClose}
          show={show}
          id={updateId}
          updateState={(data) => changeState(data)}
          oneState={oneState}
        />
        <DtailTreeBudgetingModal
          close={handleCloseDetail}
          show={showDetail}
          id={updateId}
        />
        <AddTreeBudgetingModal
          close={handleCloseAdd}
          show={showAdd}
          id={cId}
          updateState={(data) => upState(data)}
        />
      </div>
    </div>
  );
}

export default TreeBudgetingTable;
