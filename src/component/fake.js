import React, { useEffect, useState } from "react";
import { useParams , NavLink} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getProductData } from "../../redux/action/productAction";
import {SelectedCartData} from '../../redux/action/action';
import ImageGallery from "react-image-gallery";
import { FaAngleRight } from "react-icons/fa";
import { imgnotvalid } from "../img/img";
import "react-image-gallery/styles/css/image-gallery.css";
import { Button, Card, Col, Container, Nav, Row, Tab } from "react-bootstrap";
import "./productDetails.css";

const ProductDetails = () => {

  const [input, setInuput] = useState(1);
  let [hidden,setHidden] = useState({});
  const { slug } = useParams();
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const cartDataP = useSelector((state) =>  state?.getProductDataReducer?.data);
  console.log(cartDataP?.images[0]);
  const products = useSelector((state) => state?.getCartDataReducer?.data);
  const relatedId = cartDataP&&cartDataP.related_ids;

  useEffect(() => {
    dispatch(getProductData(slug));
  }, [slug]);

  useEffect(() => {
    if (
      cartDataP &&
      cartDataP.images &&
      cartDataP &&
      cartDataP.images.length > 1
    ) {
      setImage(
        cartDataP &&
          cartDataP.images.map((url) => ({
            original: `${url.src}`,
            thumbnail: `${url.src}`,
          }))
      );
    } else {
      setImage(null);
    }
  }, [cartDataP && cartDataP.images]);


  let result = [];
  products&&products.map((item) => {
      relatedId && relatedId.map((data) => {
          if (item.id === data) {
              return result.push(item)
          }
      })
  })
  const handlclick = (data) => {
    // console.log("handleclick", data);
    if (!hidden[data.id]) {
      setHidden({ ...hidden, [data.id]: !hidden[data.id] });
    }
    dispatch(
      SelectedCartData({
        data,
        quantity:input,
      })
    );
  };

  return (
    <div className="productDetails">
      <div className="main">
        <Card.Body>
          <Container>
            {cartDataP && cartDataP.lenght !== 0 ? (
              <Row className="individualproductrowdata  align-items-center">
                <Col md={4} className="g-5  position-relative">
                  {image ? (
                    <ImageGallery
                      showFullscreenButton={false}
                      showPlayButton={false}
                      items={image}
                    />
                  ) : (
                    <Card.Img
                      className="productimg"
                      src={
                        cartDataP?.images?.length
                          ? cartDataP?.images[0]?.src
                          : imgnotvalid
                      }
                    ></Card.Img>
                  )}
                </Col>
                <Col md={8} className="g-5" style={{ textAlign: "initial" }}>
                  <div className="pb-5 border-bottom">
                    <Card.Text style={{ color: "black", fontSize: 20 }}>
                      {cartDataP.name}
                    </Card.Text>
                    <Card.Text
                      dangerouslySetInnerHTML={{ __html:  cartDataP.price_html }}
                    ></Card.Text>
                    <input
                      type="number"
                      min={1}
                      className="inputBox mt-4"
                      style={{ textAlign: "center" }}
                      value={input}
                      onChange={(e) => setInuput(e.target.value)}
                    ></input>
                    <button className="Addtocartbtn"  onClick={() =>  handlclick(cartDataP)}>
                      Add to cart
                    </button>
                    {cartDataP?.categories ? (
                      <Nav.Link className="mt-4">
                   
                      </Nav.Link>
                    ) : (
                      ""
                    )}
                  </div>
                </Col>
              </Row>
            ) : (
              ""
            )}
          </Container>
        </Card.Body>
      </div>
      <Card>
        <Card.Body>
          <Container>
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
              <Row>
                <Col md={2} className="g-5">
                  <Nav variant="outline-primary" className="flex-column g-5">
                    <Nav.Item>
                      <Nav.Link className="tab1" eventKey="first">
                        Description
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="second">Reviews</Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Col>
                <Col md={2} className="g-5">
                  <Tab.Pane eventKey="first">
                    <FaAngleRight />
                  </Tab.Pane>
                  <Tab.Pane eventKey="second">
                    <FaAngleRight />
                  </Tab.Pane>
                </Col>
                <Col md={7} className="g-5">
                  <Tab.Content style={{ tabContent: "initial" }}>
                    <Tab.Pane eventKey="first">
                      <Card.Title>Description</Card.Title>
                      <div>
                        <Card.Text
                          dangerouslySetInnerHTML={{
                            __html: cartDataP && cartDataP.description,
                          }}
                        ></Card.Text>
                      </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="second">
                      <Card.Title>Reviews</Card.Title>
                      <Card.Text>There are no reviews yet</Card.Text>
                    </Tab.Pane>
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
          </Container>
        </Card.Body>
      </Card>
      <Col>
        <Card>
          <Card.Title className="cardTitle title">Related  products</Card.Title>
          <div className="d-flex justify-content-center relatedproduct ">
              {result &&
              result.map((info, index) => {
                {/* console.log("infoooo",info) */}
                return (
                  <div key={index} className="d-flex justify-content-center ">
                    <Card.Body>
                      <Card.Img
                        src={
                          info?.images?.length > 0
                            ? info.images[0].src
                            : imgnotvalid

                        }
                      ></Card.Img>
                      <Card.Title className="cardTitle mt-4">
                        {info.name}
                      </Card.Title>
                      <Card.Text
                        className="mt-3"
                        dangerouslySetInnerHTML={{ __html: info.price_html }}
                      ></Card.Text>
                      <Button variant="primary" onClick={"hello"}>
                        {" "}
                        Add to Cart
                      </Button>

                      {!!hidden[info.id] ? (
                        <Button className="viewcart">
                          {" "}
                          <NavLink
                            className="nav-link"
                            style={{ color: "white" }}
                            to="/cart"
                          >
                            View Cart
                          </NavLink>
                        </Button>
                      ) : (
                        ""
                      )}
                    </Card.Body>
                  </div>
                );
              })}
          </div>
        </Card>
      </Col>
    </div>
  );
};

export default ProductDetails;

