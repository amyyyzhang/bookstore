import {Col, Row} from "react-bootstrap"
import { StoreItem } from "../components/StoreItem"
import storeItems from "../data/items.json"


export function Store() {
    return (
      <>
        <div style = {{textAlign:'center'}}>
          <h1>
          ♡*ﾟ✿ Book Shop *:･ﾟ✧*:･ﾟ
          </h1>

        </div>
  
        <Row md={2} xs={1} lg={3} className="g-3">
          {storeItems.map(item => (
            <Col key={item.id}>
              <StoreItem {...item} />
            </Col>
          ))}
        </Row>
      </>
    )
  }