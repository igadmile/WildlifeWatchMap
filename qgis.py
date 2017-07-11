layer = iface.activeLayer()
for f in layer.getFeatures():
    print f['name']
    layer.setSelectedFeatures([f.id()])
   #print "%s%s%s" % ('/home/mile/slojevibike/', f['name'],'.shp')
    QgsVectorFileWriter.writeAsVectorFormat(layer, "%s%s" % ('/home/mile/slojevibike/', f['name']), "UTF8", None, "KML", True)