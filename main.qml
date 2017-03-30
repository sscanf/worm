import QtQuick 2.5
import QtQuick.Controls 1.4
import "Jssnike.js" as JsSnike
import FPS 1.0

ApplicationWindow {

    property int moveX  :0
    property int moveY  :0
    property int mX :0
    property int mY :0

    visible: true
    width  : 1024
    height : 1024

    Component.onCompleted: {
        JsSnike.newGame(10);
    }


    Item {
        width : parent.width
        height: parent.height

        Image {
            id          : background
            anchors.fill: parent
            source      : "background"
            fillMode    : Image.PreserveAspectCrop
        }

        FPSText{
            id: fps_text
            x:0
            y: 0;
            width: 200
            height: 40
            Text {
                color: "white"
                font.pixelSize: 40
                anchors.centerIn: parent
                text: fps_text.fps.toFixed(2) + " FPS"
            }
        }
        MouseArea {
            anchors.fill   : parent;
            acceptedButtons: Qt.LeftButton | Qt.RightButton
            hoverEnabled   : true

            onClicked: {
                JsSnike.newChain();
            }

            onPositionChanged: {
                mX = mouse.x;
                mY = mouse.y;
            }
        }
    }

    Timer {
       interval: 20
       repeat  : true
       running : true

       onTriggered: {

            moveX=0;
            moveY=0;

            var point = JsSnike.getHeadPosition();
            if (point.x>mX+40)
                moveX = -1;
            else if (point.x<mX-40)
                moveX = 1;

            if (point.y>mY+40)
                moveY = -1;
            else if (point.y<mY-40)
                moveY = 1;

           JsSnike.moveSnike(moveX,moveY, mX, mY);
       }
    }
}

