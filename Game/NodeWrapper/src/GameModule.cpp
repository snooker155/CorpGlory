//
// Created by ees on 11/4/15.
//

#include <node.h>
#include <v8.h>

#include "GameWrapper.hpp"
#include <thread>

using namespace v8;
using v8::Local;
using v8::Object;

//Handle<Value> Method(const Arguments& args)
//{
//  HandleScope scope;
//  return scope.Close(String::New("world"));
//}

void init(Local<Object> target)
{
  GameWrapper::init(target);
//  target->Set(String::NewSymbol("hello"), FunctionTemplate::New(Method)->GetFunction());
}

NODE_MODULE(GameWrapper, init)