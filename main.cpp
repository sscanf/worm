#include <QGuiApplication>
#include <QQmlApplicationEngine>
#include "fpstext.h"

int main(int argc, char *argv[])
{
    QCoreApplication::setAttribute(Qt::AA_EnableHighDpiScaling);
    QGuiApplication app(argc, argv);

    QQmlApplicationEngine engine;
     qmlRegisterType<FPSText>("FPS", 1, 0, "FPSText");
    engine.load(QUrl(QLatin1String("qrc:/main.qml")));

    return app.exec();
}
