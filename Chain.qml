import QtQuick 2.0

Item {
    property string sprite

    id    : img
    width : 40
    height: 40
    Image {
        anchors.fill: parent
        source      : sprite;
    }

    Behavior on x {
        NumberAnimation { duration: 100 }
    }

    Behavior on y {
        NumberAnimation { duration: 100 }
    }
}
