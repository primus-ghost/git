import { isEmpty } from "lodash";
import React, { useEffect, useState } from "react";
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
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { loading } from "../../../actions/loading";
import { getAllTreeBudgetingParentAction, parentIdTreeBudgetingAction, parentIdUpdateTreeBudgetingAction } from "../../../actions/TreeBudgetingAction";
import {
  deleteTreeBudgeting,
  getAllTreeBudgetingParent,
  getOneTreeBudgeting,
} from "../../../services/TreeBudgetingServices";
import TreeBudgetingSubject from "./TreeBudgetingSubject";
import AddTreeBudgetingModal from "./AddTreeBudgetingModal";
import DtailTreeBudgetingModal from "./DtailTreeBudgetingModal";
import UpdateTreeBudgetingModal from "./UpdateTreeBudgetingModal";
import language from "../../../config/language.json";

function TreeBudgetingTable() {
  const dispatch = useDispatch();
  const lan={...language[0]}

  const [updateId, setUpdateId] = useState(0);
  const [state, setState] = useState();
  const [prArrow, setPrArrow] = useState(false);
  const [cId, setId] = useState();
  const [childState, setChildState] = useState();
  const [showAdd, setShowAdd] = useState(false);
  const [oneState,setOneState]=useState();

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

  function CustomToggle({ children, eventKey, id }) {
    const decoratedOnClick = useAccordionToggle(eventKey, async () => {
      dispatch(parentIdTreeBudgetingAction(id))
      dispatch(loading(true));
      const { data } = await getAllTreeBudgetingParent(id);   
      console.log("id",id,"data",data)
      if (data.result === "success") {
        setChildState(data.data);
        dispatch(loading(false));
      }

      setPrArrow(!prArrow);
    });
    let classes = [
      "bg-transparent",
      "p-0",
      "border-0",
      "shadow-none",
      prArrow && "active-rotate",
    ];
    return (
      <Button
        className={classes.join(" ")}
        onClick={ () => {
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
     const {data}=  await getOneTreeBudgeting(id)
     if(data.result === "success"){
      setOneState(data)
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
    console.log("state state ", state);
  }

  function upState(data) {
    setChildState([...childState, ...data.data]);
  }


  const handleChildDelete = async (id,parentId) => {
  
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
    console.log(id)
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
      if (data.result === "success" ) {
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
          <Col md={6} className="table-result text-right">
            
          </Col>
          <Col md={6} className="add-btn text-right">
            <Button className="dark-blue" onClick={() =>{
               addMainItem()
               }}>
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
                      <CustomToggle id={item.treeId} eventKey={item.treeId}>
                        <i className="fa fa-caret-left detail-btn"></i>
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
                          onClick={(id) =>{
                             handleUpdates(item.treeId)
                            dispatch(parentIdUpdateTreeBudgetingAction(0))
                          
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
                          onClick={(id) =>{
                            handleDelete(item.treeId)
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
                          delete={(id,parentId) => handleChildDelete(id,parentId)}
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









////////////////////////////////////////////////////////////







import { isEmpty } from "lodash";
import { useState } from "react";
import { useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import language from "../../../config/language.json"
import { addTreeBudgeting, getAllTreeBudgetingParent, getBudgetingTreeTitle } from "../../../services/TreeBudgetingServices";

function AddTreeBudgetingForm({close,id,updateState}) {
    
    const lan={...language[0]}
    const dispatch = useDispatch();
  
    const { register, errors, handleSubmit } = useForm();
    const [state,setState]=useState([])
    
    const onSubmit = async (input) => {
        const {data}=await addTreeBudgeting(input)
        if(data.result === "success"){
          updateState(data)
          toast.success("با موفقیت افزوده شد")
          close()
        }else{
        toast.error(`${data.faultMessage}`)
        }
    };
    console.log("id add id add adda ddd",id)
    useEffect(async() => {
      //  dispatch(getAllGroupProductPaginationAction(NormSubjectId,pageNumber, token)); 
      const {data}=await getBudgetingTreeTitle(id);
      if(data.result === "success"){
        setState(data)
      }
    }, []);
      
      return (
        <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="title">
          <Form.Label>{lan.tree_budgeting_title}</Form.Label>
          <Form.Control
            type="text"
            name="title"
            ref={register({ required: true })}
          />
          {errors.title && (
            <p className="login-form-error">پر کردن این فیلد الزامی است</p>
          )}
        </Form.Group>

        <Form.Group controlId="treeTitleId">
          <Form.Label>{lan.tree_budgeting_addForm_input}</Form.Label>
          <Form.Control
            name="treeTitleId"
            ref={register({ required: false })}
            as="select"
          >
            {!isEmpty(state) &&
              state.data.map(item=>(
                <option key={item.treeTitleId} value={item.treeTitleId}>
                  {item.title}
                </option>
              ))
          }
            
          </Form.Control>
        </Form.Group>
       
        <Form.Group className="d-none" controlId="parentId">
        
          <Form.Control
            type="text"
            name="parentId"
            ref={register()}
            value={id}
          />       
        </Form.Group>
        <Button className='dark-blue w-100' type="submit">
          {lan.norm_GroupProduct_AddGproductForm_button}
        </Button>
      </Form>
      )
}

export default AddTreeBudgetingForm

/////////////////////////////////////////////////////////////
import { isEmpty } from "lodash";
import React, { useState } from "react";
import { useEffect } from "react";
import {
  Accordion,
  Button,
  Card,
  Col,
  OverlayTrigger,
  Row,
  Tooltip,
  useAccordionToggle,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { loading } from "../../../actions/loading";
import {
  parentIdTreeBudgetingAction,
  parentIdUpdateTreeBudgetingAction,
} from "../../../actions/TreeBudgetingAction";
import {
  deleteTreeBudgeting,
  getAllTreeBudgetingParent,
  getOneTreeBudgeting,
} from "../../../services/TreeBudgetingServices";
import AddTreeBudgetingModal from "./AddTreeBudgetingModal";
import DtailTreeBudgetingModal from "./DtailTreeBudgetingModal";
import UpdateTreeBudgetingModal from "./UpdateTreeBudgetingModal";

function TreeBudgetingSubject(props) {
  const [updateId, setUpdateId] = useState(0);
  const [state, setState] = useState([]);
  const [arrow, setArrow] = useState(false);
  const [cId, setId] = useState();
  const [oneState,setOneState]=useState()

  const dispatch = useDispatch();
  const [showAdd, setShowAdd] = useState(false);
  // show/hide modal functions
  const handleCloseAdd = () => setShowAdd(false);
  const handleShowAdd = () => setShowAdd(true);

  const [show, setShow] = useState(false);
  // show/hide modal functions
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const addTreeItem = async (id) => {
    setId(id);
    handleShowAdd();
  };

  const [showDetail, setShowDetail] = useState(false);
  // show/hide modal functions
  const handleCloseDetail = () => setShowDetail(false);
  const handleShowDetail = () => setShowDetail(true);
  const handleDetails = async (id) => {
    setUpdateId(id);
   
     handleShowDetail();
  };

  const handleUpdates = async (id) => {
    setUpdateId(id);
    const {data}=  await getOneTreeBudgeting(id)
    console.log("one state from server",data)
    if(data.result === "success"){
      setOneState(data)
      handleShow();
    }
    
  };
  let classes = [
    "bg-transparent",
    "p-0",
    "border-0",
    "shadow-none",
    arrow ? "active-rotate" : "",
  ];
  function CustomToggle({ children, eventKey, id }) {
    const decoratedOnClick = useAccordionToggle(eventKey, async () => {
      dispatch(parentIdTreeBudgetingAction(id));
      dispatch(loading(true));
      const { data } = await getAllTreeBudgetingParent(id);
      if (data.result === "success") {
        setState(data.data);
        dispatch(loading(false));
      }
      setArrow(!arrow);
    });
    return (
      <Button
        className={classes.join(" ")}
        onClick={ () => {
        
          decoratedOnClick();
        }}
      >
        {children}
      </Button>
    );
  }

  function upState(data) {
    setState([...state, ...data.data]);
  }

  function upChildState(data) {
    let newState = [...state];
    let i = newState.findIndex((item) => item.treeId == data.data[0].treeId);
    newState[i] = data.data[0];
    setState(newState);
  }

  const handleChildDelete = async (id,parentId) => {
   
    const a = window.confirm("آیا میخواهید این گزینه پاک شود ؟");
    if (a == true) {
      const { data } = await deleteTreeBudgeting(id);
      if (data.result === "success") {
        toast.success("با موفقیت حذف شد");
        const { data } = await getAllTreeBudgetingParent(parentId);
        if (data.result === "success") {
          setState(data.data);
        } else {
          toast.error(`${data.faultMessage}`);
        }
      }
    }
    console.log(id);
  };

  return (
    <div>
      {!isEmpty(props.childState) &&
        props.childState.map((item) => (
          <Accordion>
            <Card key={item.treeId}>
              <Card.Header>
                <Row>
                  <Col md={6}>
                    <CustomToggle id={item.treeId} eventKey={item.treeId}>
                      <i className="fa fa-caret-left detail-btn"></i>
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
                        onClick={() => handleDetails(item.treeId)}
                        className="fa fa-info detail-btn"
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
                          dispatch(
                            parentIdUpdateTreeBudgetingAction(props.parentId)
                          );
                        }}
                      ></i>
                    </OverlayTrigger>

                    <OverlayTrigger
                      key="top"
                      placement="top"
                      overlay={<Tooltip id="tooltip-top">حذف</Tooltip>}
                    >
                      <i
                        onClick={(id) => {
                          props.delete(item.treeId,props.parentId);
                          // handleDelete(item.treeId)
                          // dispatch(parentIdTreeBudgetingAction(item.treeId))
                        }}
                        className="fa fa-trash delete-btn"
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
                      delete={(id,parentId) => handleChildDelete(id,parentId)}
                      newState={(data) => upChildState(data)}
                      childState={state}
                      key={item.treeId}
                      id={item.treeId}
                    />
                  </Card.Header>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        ))}
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
      <UpdateTreeBudgetingModal
        close={handleClose}
        show={show}
        id={updateId}
        updateState={(data) => props.newState(data)}
        oneState={oneState}
      />
    </div>
  );
}

export default TreeBudgetingSubject;
