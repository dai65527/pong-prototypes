// Code generated by go-swagger; DO NOT EDIT.

package operations

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the swagger generate command

import (
	"net/http"

	"github.com/go-openapi/runtime"

	"github.com/dai65527/pong-prototypes/openapi-todo/server-golang/openapi/models"
)

// DeleteItemOKCode is the HTTP code returned for type DeleteItemOK
const DeleteItemOKCode int = 200

/*DeleteItemOK OK

swagger:response deleteItemOK
*/
type DeleteItemOK struct {

	/*
	  In: Body
	*/
	Payload interface{} `json:"body,omitempty"`
}

// NewDeleteItemOK creates DeleteItemOK with default headers values
func NewDeleteItemOK() *DeleteItemOK {

	return &DeleteItemOK{}
}

// WithPayload adds the payload to the delete item o k response
func (o *DeleteItemOK) WithPayload(payload interface{}) *DeleteItemOK {
	o.Payload = payload
	return o
}

// SetPayload sets the payload to the delete item o k response
func (o *DeleteItemOK) SetPayload(payload interface{}) {
	o.Payload = payload
}

// WriteResponse to the client
func (o *DeleteItemOK) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.WriteHeader(200)
	payload := o.Payload
	if err := producer.Produce(rw, payload); err != nil {
		panic(err) // let the recovery middleware deal with this
	}
}

// DeleteItemInternalServerErrorCode is the HTTP code returned for type DeleteItemInternalServerError
const DeleteItemInternalServerErrorCode int = 500

/*DeleteItemInternalServerError Internal Server Error

swagger:response deleteItemInternalServerError
*/
type DeleteItemInternalServerError struct {

	/*
	  In: Body
	*/
	Payload *models.Error `json:"body,omitempty"`
}

// NewDeleteItemInternalServerError creates DeleteItemInternalServerError with default headers values
func NewDeleteItemInternalServerError() *DeleteItemInternalServerError {

	return &DeleteItemInternalServerError{}
}

// WithPayload adds the payload to the delete item internal server error response
func (o *DeleteItemInternalServerError) WithPayload(payload *models.Error) *DeleteItemInternalServerError {
	o.Payload = payload
	return o
}

// SetPayload sets the payload to the delete item internal server error response
func (o *DeleteItemInternalServerError) SetPayload(payload *models.Error) {
	o.Payload = payload
}

// WriteResponse to the client
func (o *DeleteItemInternalServerError) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.WriteHeader(500)
	if o.Payload != nil {
		payload := o.Payload
		if err := producer.Produce(rw, payload); err != nil {
			panic(err) // let the recovery middleware deal with this
		}
	}
}
