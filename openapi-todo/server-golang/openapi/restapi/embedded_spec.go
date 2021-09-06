// Code generated by go-swagger; DO NOT EDIT.

package restapi

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the swagger generate command

import (
	"encoding/json"
)

var (
	// SwaggerJSON embedded version of the swagger document used at generation time
	SwaggerJSON json.RawMessage
	// FlatSwaggerJSON embedded flattened version of the swagger document used at generation time
	FlatSwaggerJSON json.RawMessage
)

func init() {
	SwaggerJSON = json.RawMessage([]byte(`{
  "consumes": [
    "application/json"
  ],
  "produces": [
    "application/json"
  ],
  "schemes": [
    "http"
  ],
  "swagger": "2.0",
  "info": {
    "title": "todo",
    "contact": {},
    "version": "1.0"
  },
  "host": "localhost:3000",
  "paths": {
    "/item": {
      "get": {
        "description": "get all items",
        "summary": "get all items",
        "operationId": "get-item",
        "responses": {
          "200": {
            "description": "OK",
            "schema": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/Item"
              }
            }
          },
          "500": {
            "description": "Internal Server Error",
            "schema": {
              "$ref": "#/definitions/Error"
            }
          }
        }
      },
      "put": {
        "description": "update a item",
        "summary": "update a item",
        "operationId": "put-item",
        "parameters": [
          {
            "name": "body",
            "in": "body",
            "schema": {
              "type": "object",
              "required": [
                "id",
                "name",
                "comment",
                "done"
              ],
              "properties": {
                "comment": {
                  "type": "string"
                },
                "done": {
                  "type": "boolean"
                },
                "id": {
                  "type": "integer"
                },
                "name": {
                  "type": "string"
                }
              }
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "schema": {
              "$ref": "#/definitions/Item"
            }
          },
          "400": {
            "description": "Bad Request",
            "schema": {
              "$ref": "#/definitions/Error"
            }
          },
          "404": {
            "description": "Not Found",
            "schema": {
              "$ref": "#/definitions/Error"
            }
          },
          "500": {
            "description": "Internal Server Error",
            "schema": {
              "$ref": "#/definitions/Error"
            }
          }
        }
      },
      "post": {
        "description": "add a new item",
        "summary": "add a item",
        "operationId": "post-item",
        "parameters": [
          {
            "name": "body",
            "in": "body",
            "schema": {
              "type": "object",
              "required": [
                "name",
                "comment"
              ],
              "properties": {
                "comment": {
                  "type": "string"
                },
                "name": {
                  "type": "string"
                }
              }
            }
          }
        ],
        "responses": {
          "201": {
            "description": "Created",
            "schema": {
              "$ref": "#/definitions/Item"
            }
          },
          "400": {
            "description": "Bad Request",
            "schema": {
              "$ref": "#/definitions/Error"
            }
          },
          "500": {
            "description": "Internal Server Error",
            "schema": {
              "$ref": "#/definitions/Error"
            }
          }
        }
      },
      "delete": {
        "description": "delete done items",
        "summary": "delete done items",
        "operationId": "delete-item",
        "responses": {
          "200": {
            "description": "OK",
            "schema": {
              "type": "object"
            }
          },
          "500": {
            "description": "Internal Server Error",
            "schema": {
              "$ref": "#/definitions/Error"
            }
          }
        }
      }
    },
    "/item/{itemId}": {
      "get": {
        "summary": "get item data",
        "operationId": "get-item-itemId",
        "responses": {
          "200": {
            "description": "OK",
            "schema": {
              "$ref": "#/definitions/Item"
            }
          },
          "400": {
            "description": "Bad Request",
            "schema": {
              "$ref": "#/definitions/Error"
            }
          },
          "404": {
            "description": "Not Found",
            "schema": {
              "$ref": "#/definitions/Error"
            }
          },
          "500": {
            "description": "Internal Server Error",
            "schema": {
              "$ref": "#/definitions/Error"
            }
          }
        }
      },
      "delete": {
        "summary": "delete a item",
        "operationId": "delete-item-itemId",
        "responses": {
          "200": {
            "description": "OK",
            "schema": {
              "type": "object"
            }
          },
          "400": {
            "description": "Bad Request",
            "schema": {
              "$ref": "#/definitions/Error"
            }
          },
          "404": {
            "description": "Not Found",
            "schema": {
              "$ref": "#/definitions/Error"
            }
          },
          "500": {
            "description": "Internal Server Error",
            "schema": {
              "$ref": "#/definitions/Error"
            }
          }
        }
      },
      "parameters": [
        {
          "type": "string",
          "name": "itemId",
          "in": "path",
          "required": true
        }
      ]
    }
  },
  "definitions": {
    "Error": {
      "type": "object",
      "title": "Error",
      "required": [
        "message"
      ],
      "properties": {
        "message": {
          "type": "string"
        }
      }
    },
    "Item": {
      "type": "object",
      "title": "Item",
      "required": [
        "id",
        "name",
        "comment",
        "done",
        "created_at",
        "updated_at"
      ],
      "properties": {
        "comment": {
          "type": "string"
        },
        "created_at": {
          "type": "integer"
        },
        "done": {
          "type": "boolean"
        },
        "id": {
          "type": "integer"
        },
        "name": {
          "type": "string"
        },
        "updated_at": {
          "type": "integer"
        }
      }
    }
  }
}`))
	FlatSwaggerJSON = json.RawMessage([]byte(`{
  "consumes": [
    "application/json"
  ],
  "produces": [
    "application/json"
  ],
  "schemes": [
    "http"
  ],
  "swagger": "2.0",
  "info": {
    "title": "todo",
    "contact": {},
    "version": "1.0"
  },
  "host": "localhost:3000",
  "paths": {
    "/item": {
      "get": {
        "description": "get all items",
        "summary": "get all items",
        "operationId": "get-item",
        "responses": {
          "200": {
            "description": "OK",
            "schema": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/Item"
              }
            }
          },
          "500": {
            "description": "Internal Server Error",
            "schema": {
              "$ref": "#/definitions/Error"
            }
          }
        }
      },
      "put": {
        "description": "update a item",
        "summary": "update a item",
        "operationId": "put-item",
        "parameters": [
          {
            "name": "body",
            "in": "body",
            "schema": {
              "type": "object",
              "required": [
                "id",
                "name",
                "comment",
                "done"
              ],
              "properties": {
                "comment": {
                  "type": "string"
                },
                "done": {
                  "type": "boolean"
                },
                "id": {
                  "type": "integer"
                },
                "name": {
                  "type": "string"
                }
              }
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "schema": {
              "$ref": "#/definitions/Item"
            }
          },
          "400": {
            "description": "Bad Request",
            "schema": {
              "$ref": "#/definitions/Error"
            }
          },
          "404": {
            "description": "Not Found",
            "schema": {
              "$ref": "#/definitions/Error"
            }
          },
          "500": {
            "description": "Internal Server Error",
            "schema": {
              "$ref": "#/definitions/Error"
            }
          }
        }
      },
      "post": {
        "description": "add a new item",
        "summary": "add a item",
        "operationId": "post-item",
        "parameters": [
          {
            "name": "body",
            "in": "body",
            "schema": {
              "type": "object",
              "required": [
                "name",
                "comment"
              ],
              "properties": {
                "comment": {
                  "type": "string"
                },
                "name": {
                  "type": "string"
                }
              }
            }
          }
        ],
        "responses": {
          "201": {
            "description": "Created",
            "schema": {
              "$ref": "#/definitions/Item"
            }
          },
          "400": {
            "description": "Bad Request",
            "schema": {
              "$ref": "#/definitions/Error"
            }
          },
          "500": {
            "description": "Internal Server Error",
            "schema": {
              "$ref": "#/definitions/Error"
            }
          }
        }
      },
      "delete": {
        "description": "delete done items",
        "summary": "delete done items",
        "operationId": "delete-item",
        "responses": {
          "200": {
            "description": "OK",
            "schema": {
              "type": "object"
            }
          },
          "500": {
            "description": "Internal Server Error",
            "schema": {
              "$ref": "#/definitions/Error"
            }
          }
        }
      }
    },
    "/item/{itemId}": {
      "get": {
        "summary": "get item data",
        "operationId": "get-item-itemId",
        "responses": {
          "200": {
            "description": "OK",
            "schema": {
              "$ref": "#/definitions/Item"
            }
          },
          "400": {
            "description": "Bad Request",
            "schema": {
              "$ref": "#/definitions/Error"
            }
          },
          "404": {
            "description": "Not Found",
            "schema": {
              "$ref": "#/definitions/Error"
            }
          },
          "500": {
            "description": "Internal Server Error",
            "schema": {
              "$ref": "#/definitions/Error"
            }
          }
        }
      },
      "delete": {
        "summary": "delete a item",
        "operationId": "delete-item-itemId",
        "responses": {
          "200": {
            "description": "OK",
            "schema": {
              "type": "object"
            }
          },
          "400": {
            "description": "Bad Request",
            "schema": {
              "$ref": "#/definitions/Error"
            }
          },
          "404": {
            "description": "Not Found",
            "schema": {
              "$ref": "#/definitions/Error"
            }
          },
          "500": {
            "description": "Internal Server Error",
            "schema": {
              "$ref": "#/definitions/Error"
            }
          }
        }
      },
      "parameters": [
        {
          "type": "string",
          "name": "itemId",
          "in": "path",
          "required": true
        }
      ]
    }
  },
  "definitions": {
    "Error": {
      "type": "object",
      "title": "Error",
      "required": [
        "message"
      ],
      "properties": {
        "message": {
          "type": "string"
        }
      }
    },
    "Item": {
      "type": "object",
      "title": "Item",
      "required": [
        "id",
        "name",
        "comment",
        "done",
        "created_at",
        "updated_at"
      ],
      "properties": {
        "comment": {
          "type": "string"
        },
        "created_at": {
          "type": "integer"
        },
        "done": {
          "type": "boolean"
        },
        "id": {
          "type": "integer"
        },
        "name": {
          "type": "string"
        },
        "updated_at": {
          "type": "integer"
        }
      }
    }
  }
}`))
}
