#!/usr/bin/python

import sys,os,json

if __name__ == "__main__":
    n1 = sys.argv[1]
    n2 = sys.argv[2]
    
    POIs = {}

    with open(n2) as poifile:
        for poi in poifile:
            try:
                _,pid,_,desc,_ = poi.split(',')
                print pid,desc 
                POIs[int(pid)] = desc
            except Exception as e:
                print e

    num = 0
    outdata = []
    with open(n1) as jdata:
        l = json.load(jdata)
        print l['features'][0]
        for point in l['features']:
            lng,lat = point['geometry']['coordinates']
            try:
                addr_id = int(point['properties']['address_id'])
                if addr_id in POIs:
                    print addr_id,lng,lat,POIs[addr_id]
                    outdata.append({
                        'addr_id':addr_id,
                        'lat':lat,
                        'lng':lng,
                        'desc':POIs[addr_id]
                    })
                    num += 1
            except Exception as e:
                print "ERROR"
                print e.message
                print point

    with open('poi.json','w') as woof:
        json.dump(outdata,woof) 
    print num
