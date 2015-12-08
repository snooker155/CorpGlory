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

void init(Local<Object> target)
{
  GameWrapper::init(target);
}

NODE_MODULE(GameWrapper, init)