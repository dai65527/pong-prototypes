// Code generated by go-swagger; DO NOT EDIT.

package operations

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the swagger generate command

import (
	"net/http"

	"github.com/go-openapi/runtime"

	"github.com/dai65527/pong-prototypes/openapi-todo/server-golang/openapi/models"
)

// PostItemCreatedCode is the HTTP code returned for type PostItemCreated
const PostItemCreatedCode int = 201

/*PostItemCreated Created

swagger:response postItemCreated
*/
type PostItemCreated struct {

	/*
	  In: Body
	*/
	Payload *models.Item `json:"body,omitempty"`
}

// NewPostItemCreated creates PostItemCreated with default headers values
func NewPostItemCreated() *PostItemCreated {

	return &PostItemCreated{}
}

// WithPayload adds the payload to the post item created response
func (o *PostItemCreated) WithPayload(payload *models.Item) *PostItemCreated {
	o.Payload = payload
	return o
}

// SetPayload sets the payload to the post item created response
func (o *PostItemCreated) SetPayload(payload *models.Item) {
	o.Payload = payload
}

// WriteResponse to the client
func (o *PostItemCreated) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.WriteHeader(201)
	if o.Payload != nil {
		payload := o.Payload
		if err := producer.Produce(rw, payload); err != nil {
			panic(err) // let the recovery middleware deal with this
		}
	}
}

// PostItemBadRequestCode is the HTTP code returned for type PostItemBadRequest
const PostItemBadRequestCode int = 400

/*PostItemBadRequest Bad Request

swagger:response postItemBadRequest
*/
type PostItemBadRequest struct {

	/*
	  In: Body
	*/
	Payload *models.Error `json:"body,omitempty"`
}

// NewPostItemBadRequest creates PostItemBadRequest with default headers values
func NewPostItemBadRequest() *PostItemBadRequest {

	return &PostItemBadRequest{}
}

// WithPayload adds the payload to the post item bad request response
func (o *PostItemBadRequest) WithPayload(payload *models.Error) *PostItemBadRequest {
	o.Payload = payload
	return o
}

// SetPayload sets the payload to the post item bad request response
func (o *PostItemBadRequest) SetPayload(payload *models.Error) {
	o.Payload = payload
}

// WriteResponse to the client
func (o *PostItemBadRequest) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.WriteHeader(400)
	if o.Payload != nil {
		payload := o.Payload
		if err := producer.Produce(rw, payload); err != nil {
			panic(err) // let the recovery middleware deal with this
		}
	}
}

// PostItemInternalServerErrorCode is the HTTP code returned for type PostItemInternalServerError
const PostItemInternalServerErrorCode int = 500

/*PostItemInternalServerError Internal Server Error

swagger:response postItemInternalServerError
*/
type PostItemInternalServerError struct {

	/*
	  In: Body
	*/
	Payload *models.Error `json:"body,omitempty"`
}

// NewPostItemInternalServerError creates PostItemInternalServerError with default headers values
func NewPostItemInternalServerError() *PostItemInternalServerError {

	return &PostItemInternalServerError{}
}

// WithPayload adds the payload to the post item internal server error response
func (o *PostItemInternalServerError) WithPayload(payload *models.Error) *PostItemInternalServerError {
	o.Payload = payload
	return o
}

// SetPayload sets the payload to the post item internal server error response
func (o *PostItemInternalServerError) SetPayload(payload *models.Error) {
	o.Payload = payload
}

// WriteResponse to the client
func (o *PostItemInternalServerError) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.WriteHeader(500)
	if o.Payload != nil {
		payload := o.Payload
		if err := producer.Produce(rw, payload); err != nil {
			panic(err) // let the recovery middleware deal with this
		}
	}
}
