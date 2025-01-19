# Additional clean files
cmake_minimum_required(VERSION 3.16)

if("${CONFIG}" STREQUAL "" OR "${CONFIG}" STREQUAL "Debug")
  file(REMOVE_RECURSE
  "CMakeFiles\\Constella_autogen.dir\\AutogenUsed.txt"
  "CMakeFiles\\Constella_autogen.dir\\ParseCache.txt"
  "Constella_autogen"
  )
endif()
