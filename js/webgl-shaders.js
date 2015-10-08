"use strict";

var BasicVertexShader = "\n\tattribute vec4 aVertexPosition;\n\tattribute vec4 aVertexColor;\n\n\tuniform mat4 uMVMatrix;\n\tuniform mat4 uPMatrix;\n\n\tvarying vec4 vColor;\n\n\tvoid main()\n\t{\n\t\tgl_Position = uPMatrix * uMVMatrix * aVertexPosition;\n\t\tvColor = aVertexColor;\n\t}\n";

var BasicFragmentShader = "\n\tprecision mediump float;\n\n\tvarying vec4 vColor;\n\n\tvoid main()\n\t{\n\t\tgl_FragColor = vColor;\n\t}\n";

// Simple vertex shader with texture support
var BasicTextureVertexShader = "\n\tattribute vec4 aVertexPosition;\n\tattribute vec2 aTextureCoord;\n\n\tuniform mat4 uMVMatrix;\n\tuniform mat4 uPMatrix;\n\tvarying vec2 vTextureCoord;\n\n\tvoid main()\n\t{\n\t\tgl_Position = uPMatrix * uMVMatrix * aVertexPosition;\n\t\tvTextureCoord = aTextureCoord;\n\t}\n";

// Simple fragment shader with texture support
var BasicTextureFragmentShader = "\n\tprecision mediump float;\n\n\tvarying vec2 vTextureCoord;\n\tuniform sampler2D uSampler;\n\tuniform vec4 uBaseColor;\n\n\tvoid main()\n\t{\n\t\tvec4 fragmentColor;\n\n\t\tfragmentColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));\n\t\tgl_FragColor = fragmentColor * uBaseColor;\n\t}\n";

// Adaptation for centered quads (or any other geometry)
var Quad2DTextureVertexShader = "\n\tattribute vec4 aVertexPosition;\n\tattribute vec2 aTextureCoord;\n\n\tuniform mat4 uPMatrix;\n\tuniform vec2 uCenterPosition;\n\tuniform float uScale;\n\tuniform float uRotation;\n\tvarying vec2 vTextureCoord;\n\n\t/* Matrix expressed as columns */\n\tmat4 mvMatrix = mat4(\n\t\tuScale * cos(uRotation), uScale * sin(uRotation), 0.0, 0.0,\n\t\t-uScale * sin(uRotation), uScale * cos(uRotation), 0.0, 0.0,\n\t\t0.0, 0.0, 1.0, 0.0,\n\t\tuCenterPosition.x, uCenterPosition.y, 0.0, 1.0\n\t);\n\n\tvoid main()\n\t{\n\t\tgl_Position = uPMatrix * mvMatrix * aVertexPosition;\n\t\tvTextureCoord = aTextureCoord;\n\t}\n";

// Adaptation for aligned rectangles (like text...)
var Rect2DTextureVertexShader = "\n\tattribute vec4 aVertexPosition;\n\tattribute vec2 aTextureCoord;\n\n\tuniform mat4 uPMatrix;\n\tuniform vec2 uCornerPosition; /* bottom left */\n\tuniform vec2 uSize; /* width, heigth */\n\tuniform vec2 uTextureCornerPosition; /* bottom left */\n\tuniform vec2 uTextureSelectionSize; /* width, heigth */\n\tuniform vec2 uTextureSize; /* width, heigth */\n\tvarying vec2 vTextureCoord;\n\n\t/* Matrix expressed as columns */\n\tmat4 mvMatrix = mat4(\n\t\tuSize.x, 0.0, 0.0, 0.0,\n\t\t0.0, uSize.y, 0.0, 0.0,\n\t\t0.0, 0.0, 1.0, 0.0,\n\t\tuCornerPosition.x, uCornerPosition.y, 0.0, 1.0\n\t);\n\n\tvoid main()\n\t{\n\t\tgl_Position = uPMatrix * mvMatrix * aVertexPosition;\n\t\tvec2 normalizedTextureCorner = uTextureCornerPosition / uTextureSize;\n\t\tvec2 textureScale = uTextureSelectionSize / uTextureSize;\n\t\tvTextureCoord = normalizedTextureCorner + aTextureCoord * textureScale;\n\t}\n";