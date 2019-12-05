{
    "targets": [
      {
        "target_name": "ot",
        "cflags!": [ "-fno-exceptions" ],
        "cflags_cc!": [ "-fno-exceptions", "-std=c++11" ],
        "sources": [ "./server/ot-addon/init.cpp" ],
        "include_dirs": [
          "<!@(node -p \"require('node-addon-api').include\")"
        ],
        'defines': [ 'NAPI_DISABLE_CPP_EXCEPTIONS' ],
      }
    ]
}
  