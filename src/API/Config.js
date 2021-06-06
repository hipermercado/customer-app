const ENV = "prod/";

const awsAPIConfig = {
    endpoints: [
        {
            name: "AddressAPI-Ramsons",
            endpoint: "https://vepl1p95cb.execute-api.ap-south-1.amazonaws.com/" + ENV
        },
        {
            name: "ProductAPI-Ramsons",
            endpoint: "https://8z6bi66j72.execute-api.ap-south-1.amazonaws.com/" + ENV
        },
        {
            name: "CategoryAPI-Ramsons",
            endpoint: "https://l6sfhfgdpg.execute-api.ap-south-1.amazonaws.com/" + ENV
        },
        {
            name: "OrdersAPI-Ramsons",
            endpoint: "https://4mk16nekv5.execute-api.ap-south-1.amazonaws.com/" + ENV
        },
        {
            name: "AddressAPI",
            endpoint: "https://9yhpqamrlj.execute-api.ap-south-1.amazonaws.com/" + ENV
        },
        {
            name: "ProductAPI",
            endpoint: "https://bcp9bjtgoh.execute-api.ap-south-1.amazonaws.com/" + ENV
        },
        {
            name: "CategoryAPI",
            endpoint: "https://3x8f0id1ck.execute-api.ap-south-1.amazonaws.com/" + ENV
        },
        {
            name: "OrdersAPI",
            endpoint: "https://9fxtdvz5uh.execute-api.ap-south-1.amazonaws.com/" + ENV
        }
    ]
}

export default awsAPIConfig;