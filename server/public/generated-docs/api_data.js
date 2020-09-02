define({ "api": [
  {
    "type": "post",
    "url": "/submitOrder",
    "title": "Order Creation",
    "name": "Order_Creation",
    "group": "Store",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "warehouseId",
            "description": "<p>Warehouse ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "productType",
            "description": "<p>The type of product being ordered (frozen || dairy || meat || produce || ambient)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "quantity",
            "description": "<p>The quantity being ordered</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "deliveryDateTime",
            "description": "<p>The requested time of delivery arival | Format (2020-08-20 10:10:10)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>Login result</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Login status</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "order",
            "description": "<p>The order that was created</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     \"success\": true,\n     \"message\": \"Order Created\",\n     \"order\": {\n         \"temperature\": [],\n         \"_id\": \"5f4e2f699542e13530ca1835\",\n         \"orderId\": 1006,\n         \"storeId\": 11111,\n         \"warehouseId\": 1111,\n         \"productType\": \"frozen\",\n         \"quantity\": 12,\n         \"deliveryDateTime\": 1629418210000,\n         \"orderDateTime\": 1598959464000,\n         \"orderStatus\": \"Unfulfilled\",\n         \"__v\": 0\n     }\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>The id of the warehouse is incorrect.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 406 BadRequest\n{\n     \"success\": false,\n     \"message\": \"Warehouse ID in incorrect format\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/submitOrder.js",
    "groupTitle": "Store"
  },
  {
    "type": "post",
    "url": "/registerStore",
    "title": "Register Store",
    "name": "Register_Store",
    "group": "Store",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Store  ID (Five digits long)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>The Store's password</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "location",
            "description": "<p>The Store's location</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>Register result</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Register status</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     \"success\": true,\n     \"message\": \"Store Created\"\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "StoreExists",
            "description": "<p>The id of the store is already in use.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 406 StoreExists\n{\n    \"success\": false,\n    \"message\": \"ID already exists\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/registerStore.js",
    "groupTitle": "Store"
  },
  {
    "type": "post",
    "url": "/updateStoreSOH",
    "title": "Update Store SOH",
    "name": "Update_Store_SOH",
    "group": "Store",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "productType",
            "description": "<p>The type of SOH being updated (frozen || dairy || meat || produce || ambient)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "quantity",
            "description": "<p>The new quantity</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>Update result</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Update status</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "store",
            "description": "<p>The store that was updated</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     \"success\": true,\n     \"message\": \"SOH Updated\",\n     \"store\": {\n         \"_id\": \"5f3d14a15b6d3362e810f462\",\n         \"id\": 11111,\n         \"password\": \"$2b$10$.SlJBhXYNPWPaaAZ1JPyXOvQqPBGuEpuTkwmpe.XzPP5JO5c0QYPu\",\n         \"location\": {\n             \"lat\": -37.650623,\n             \"long\": 145.025698\n         },\n         \"hasOrdered\": false,\n         \"__v\": 0,\n         \"SOH\": {\n             \"frozen\": \"3\",\n             \"dairy\": 0,\n             \"meat\": 0,\n             \"produce\": 0,\n             \"ambient\": 0\n         }\n     }\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>The product type is incorrect.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 406 BadRequest\n{\n     \"success\": false,\n     \"message\": \"Product Type in incorrect format\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/updateStoreSOH.js",
    "groupTitle": "Store"
  },
  {
    "type": "get",
    "url": "/viewStoreOrders",
    "title": "View Store Orders",
    "name": "View_Store_Orders",
    "group": "Store",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>Request result</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Request status</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "orders",
            "description": "<p>The orders from that store</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     \"success\": true,\n     \"message\": \"Orders Displayed\",\n     \"orders\": [\n         {\n             \"temperature\": [],\n             \"_id\": \"5f48ba4ad4ce8c6ee4329928\",\n             \"orderId\": 1004,\n             \"storeId\": 11111,\n             \"warehouseId\": 1111,\n             \"productType\": \"frozen\",\n             \"quantity\": 12,\n             \"deliveryDateTime\": 1600560610000,\n             \"orderDateTime\": 1598601802000,\n             \"orderStatus\": \"Unfulfilled\",\n             \"__v\": 0\n         },\n         {\n             \"temperature\": [],\n             \"_id\": \"5f48ba8e3059bc1fd4579124\",\n             \"orderId\": 1005,\n             \"storeId\": 11111,\n             \"warehouseId\": 1111,\n             \"productType\": \"frozen\",\n             \"quantity\": 12,\n             \"deliveryDateTime\": 1600560610000,\n             \"orderDateTime\": 1598601870000,\n             \"orderStatus\": \"Unfulfilled\",\n             \"__v\": 0\n         }\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotFound",
            "description": "<p>The store has no orders.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n     \"success\": false,\n     \"message\": \"This store has no orders\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/viewStoreOrders.js",
    "groupTitle": "Store"
  },
  {
    "type": "get",
    "url": "/viewStoreSOH",
    "title": "View Store SOH",
    "name": "View_Store_SOH",
    "group": "Store",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>Request result</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Request status</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "SOH",
            "description": "<p>The SOH from that store</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     \"success\": true,\n     \"message\": \"SOH Displayed\",\n     \"SOH\": {\n         \"frozen\": \"6\",\n         \"dairy\": 0,\n         \"meat\": 0,\n         \"produce\": 0,\n         \"ambient\": 0\n     }\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotFound",
            "description": "<p>The store does not exist.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n     \"success\": false,\n     \"message\": \"This store does not esist\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/viewStoreSOH.js",
    "groupTitle": "Store"
  },
  {
    "type": "post",
    "url": "/login",
    "title": "Login",
    "name": "Login",
    "group": "Store_&_Warehouse",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Store or Warehouse ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>The store or warehouse password</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>Login result</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Login status</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "tokens",
            "description": "<p>The JWT token and JWT refresh token</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>The type of user (store || warehouse)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     \"success\": true,\n     \"message\": \"Logged In\",\n     \"tokens\": {\n         \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjExMTEiLCJpYXQiOjE1OTg5NTAxMTcsImV4cCI6MTU5ODk1MTAxN30.B4m-Va1S3cGWcnLQUHW9S5q6Ii6uYwfo-cYZmmhQS1Q\",\n         \"refreshToken\": \"refreshToken\"\n     },\n     \"type\": \"warehouse\"\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The id of the warehouse was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n    \"success\": false,\n    \"message\": \"ID does not exist\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/login.js",
    "groupTitle": "Store_&_Warehouse"
  },
  {
    "type": "post",
    "url": "/fulfillOrder",
    "title": "Fulfill Order",
    "name": "Fulfill_Order",
    "group": "Warehouse",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "orderId",
            "description": "<p>Order ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "orderStatus",
            "description": "<p>Status of the order (Unfulfilled || Fulfilled || In Transit || Delivered)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>Operation result</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Operation status</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "order",
            "description": "<p>The updated order</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"success\": true,\n     \"message\": \"Updated Order\",\n     \"order\": {\n         \"temperature\": [],\n         \"_id\": \"5f3d199cb6189681741a8365\",\n         \"orderId\": 1000,\n         \"storeId\": 1111,\n         \"warehouseId\": 1111,\n         \"productType\": \"frozen\",\n         \"quantity\": 12,\n         \"deliveryDateTime\": 1597909383000,\n         \"orderDateTime\": 1597839772000,\n         \"orderStatus\": \"Fulfilled\",\n         \"__v\": 0\n     }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "OrderNotFound",
            "description": "<p>The id of the order was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n    \"success\": false,\n    \"message\": \"Order not found\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/fulfillOrder.js",
    "groupTitle": "Warehouse"
  },
  {
    "type": "post",
    "url": "/registerWarehouse",
    "title": "Register Warehouse",
    "name": "Register_Warehouse",
    "group": "Warehouse",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Warehouse  ID (Four digits long)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>The Warehouse's password</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "location",
            "description": "<p>The Warehouse's location</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>Register result</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Register status</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     \"success\": true,\n     \"message\": \"Warehouse Created\"\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "WarehouseExists",
            "description": "<p>The id of the warehouse is already in use.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 406 WarehouseExists\n{\n    \"success\": false,\n    \"message\": \"ID already exists\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/registerWarehouse.js",
    "groupTitle": "Warehouse"
  },
  {
    "type": "post",
    "url": "/updateWarehouseSOH",
    "title": "Update Warehouse SOH",
    "name": "Update_Warehouse_SOH",
    "group": "Warehouse",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "productType",
            "description": "<p>The type of SOH being updated (frozen || dairy || meat || produce || ambient)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "quantity",
            "description": "<p>The new quantity</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>Update result</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Update status</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "warehouse",
            "description": "<p>The warehouse that was updated</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     \"success\": true,\n     \"message\": \"SOH Updated\",\n     \"warehouse\": {\n         \"_id\": \"5f3d14a15b6d3362e810f462\",\n         \"id\": 11111,\n         \"password\": \"$2b$10$.SlJBhXYNPWPaaAZ1JPyXOvQqPBGuEpuTkwmpe.XzPP5JO5c0QYPu\",\n         \"location\": {\n             \"lat\": -37.650623,\n             \"long\": 145.025698\n         },\n         \"hasOrdered\": false,\n         \"__v\": 0,\n         \"SOH\": {\n             \"frozen\": \"3\",\n             \"dairy\": 0,\n             \"meat\": 0,\n             \"produce\": 0,\n             \"ambient\": 0\n         }\n     }\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>The product type is incorrect.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 406 BadRequest\n{\n     \"success\": false,\n     \"message\": \"Product Type in incorrect format\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/updateWarehouseSOH.js",
    "groupTitle": "Warehouse"
  },
  {
    "type": "get",
    "url": "/viewWarehouseOrders",
    "title": "View Warehouse Orders",
    "name": "View_Warehouse_Orders",
    "group": "Warehouse",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>Request result</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Request status</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "orders",
            "description": "<p>The orders from that Warehouse</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     \"success\": true,\n     \"message\": \"Orders Displayed\",\n     \"orders\": [\n         {\n             \"temperature\": [],\n             \"_id\": \"5f48ba4ad4ce8c6ee4329928\",\n             \"orderId\": 1004,\n             \"storeId\": 11111,\n             \"warehouseId\": 1111,\n             \"productType\": \"frozen\",\n             \"quantity\": 12,\n             \"deliveryDateTime\": 1600560610000,\n             \"orderDateTime\": 1598601802000,\n             \"orderStatus\": \"Unfulfilled\",\n             \"__v\": 0\n         },\n         {\n             \"temperature\": [],\n             \"_id\": \"5f48ba8e3059bc1fd4579124\",\n             \"orderId\": 1005,\n             \"storeId\": 11111,\n             \"warehouseId\": 1111,\n             \"productType\": \"frozen\",\n             \"quantity\": 12,\n             \"deliveryDateTime\": 1600560610000,\n             \"orderDateTime\": 1598601870000,\n             \"orderStatus\": \"Unfulfilled\",\n             \"__v\": 0\n         }\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotFound",
            "description": "<p>The warehouse has no orders.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n     \"success\": false,\n     \"message\": \"This warehouse has no orders\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/viewWarehouseOrders.js",
    "groupTitle": "Warehouse"
  },
  {
    "type": "get",
    "url": "/viewWarehouseSOH",
    "title": "View Warehouse SOH",
    "name": "View_Warehouse_SOH",
    "group": "Warehouse",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>Request result</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Request status</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "SOH",
            "description": "<p>The SOH from that warehouse</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     \"success\": true,\n     \"message\": \"SOH Displayed\",\n     \"SOH\": {\n         \"frozen\": \"6\",\n         \"dairy\": 0,\n         \"meat\": 0,\n         \"produce\": 0,\n         \"ambient\": 0\n     }\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotFound",
            "description": "<p>The warehouse does not exist.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n     \"success\": false,\n     \"message\": \"This warehouse does not esist\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/viewWarehouseSOH.js",
    "groupTitle": "Warehouse"
  }
] });