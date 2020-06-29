const ENV = "prod/";

const awsAPIConfig = {
    endpoints: [
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