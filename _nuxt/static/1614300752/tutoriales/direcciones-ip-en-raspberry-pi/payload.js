__NUXT_JSONP__("/tutoriales/direcciones-ip-en-raspberry-pi", (function(a,b,c,d,e,f,g,h,i,j,k){c[0]="migueabellan";k.cdate="2019-04-01 00:00:00";k.mdate="2019-10-26 14:05:12";return {data:[{tutorial:{alias:"direcciones-ip-en-raspberry-pi",title:a,description:b,image:"img\u002Fpreview.jpg",contributors:c,tags:{technology:[d],hardware:[e],software:[],level:[f,g],others:[h,i]},extra:{level:"Medio",duration:"30 minutos",videos:j},date:k},title:a,description:b,image:"https:\u002F\u002Fraw.githubusercontent.com\u002FProgramoErgoSum\u002FTutoriales\u002Fmaster\u002Fv1\u002Fdirecciones-ip-en-raspberry-pi\u002Fimg\u002Fpreview.jpg",date:k,tags:[d,e,f,g,h,i],editLink:"https:\u002F\u002Fgithub.com\u002FProgramoErgoSum\u002FTutoriales\u002Fedit\u002Fmaster\u002Fv1\u002Fdirecciones-ip-en-raspberry-pi\u002FREADME.md",contributors:c,raw:"## Introducción\n\nEn este tutorial vamos a explicar cómo **fijar una dirección IP en Raspbian** para que siempre tenga la misma dirección.\n\n### Antes de empezar\n\nVas a necesitar los siguientes componentes:\n\n- Raspberry Pi con Raspbian\n- Acceso al router\n\n\n\n\u003Cbr \u002F\u003E\n\n\n\n## Direcciones IP\n\nUna dirección IP (Internet Protocol) es la dirección de red a la cual está conectado un equipo. Vendría a ser algo similar a la dirección de nuestra casa, pero utilizando números `xxx.xxx.xxx.xxx`. \n\nCada vez que nos conectamos a un router, ya sea por cable o wifi, puede que nuestro router nos otorgue una *dirección IP privada o local* distinta. Normalmente, la dirección IP se asigna de forma dinámica proporcionada por el DHCP (Dynamic Host Configuration Protocol). En este caso nuestro router hace de servidor DHCP y nos asigna una dirección IP dentro de un rango de direcciones, por ejemplo la dirección `192.168.0.138`.\n\nLo mismo pasa con nuestro proveedor de internet ISP, cada vez que reiniciamos el router puede que tengamos una *dirección IP pública* distinta.\n\n![](img\u002Fred.jpg \"Direccioones de red\")\n\nSin embargo, si tenemos una instalación permanente (servidor de archivos, sistema de videovigilancia, etc.) vamos a querer que la dirección IP sea fija.\n\n\n\n\u003Cbr \u002F\u003E\n\n\n\n## Dirección IP local\n\nPara saber la dirección IP que nos ha asignado nuestro router, debemos introducir el comando `ifgonfig` en la terminal y nos aparecerá todas las conexiones de red disponibles en nuestra Raspberry Pi con la IP asignada a cada una de ellas.\n\n```sh\npi@raspberrypi:~ $ ifconfig\n\neth0: flags=4163\u003CUP,BROADCAST,RUNNING,MULTICAST\u003E  mtu 1500\n      inet 192.168.0.138  netmask 255.255.255.0  broadcast 192.168.0.255\n      ...\n\nlo: flags=73\u003CUP,LOOPBACK,RUNNING\u003E  mtu 65536\n    inet 127.0.0.1  netmask 255.0.0.0\n    ...\n\nwlan0: flags=4163\u003CUP,BROADCAST,RUNNING,MULTICAST\u003E  mtu 1500\n       inet 10.3.141.1  netmask 255.255.255.0  broadcast 10.3.141.255\n       ...\n```\n\nSi nos fijamos, al ejecutar el comando `ifconfig` aparecen 3 conexiones:\n\n- eth0: conexión de red ethernet a través de cable\n- wlan0: conexión de red a través de WiFi\n- lo : conexión para referirse a la propia interfaz de red de la Raspberry Pi, por ejemplo, para probar el funcionamiento de la misma.\n\nDe toda la información que aparece, nos tenemos que fijar en la línea `inet ...`. Vemos como aparece la IP de cada una de las interfaces, en nuestro caso quedaría como sigue:\n\n- eth0: 192.168.0.138\n- lo: 127.0.0.1\n- wlan0: 10.3.141.1\n\nComo hemos comentado con anterioridad, dicha dirección IP puede cambiar cada vez que conectes o reinicies la Raspberry Pi ya que es asignada por el router normalmente.\n\n\n\n\u003Cbr \u002F\u003E\n\n\n\n## Hacer ping a una IP\n\nUn comando muy sencillo para comprobar si existe una dirección IP es el comando `ping`. De esta forma podemos conocer la respuesta de si existe o no dicha IP.\n\nPor ejemplo, vamos a hacer un ping a una de las IP del DNS de google mediante el comando `ping 8.8.8.8`\n```sh\npi@raspberrypi:~ $ ping 8.8.8.8\nPING 8.8.8.8 (8.8.8.8) 56(84) bytes of data.\n64 bytes from 8.8.8.8: icmp_seq=1 ttl=121 time=31.5 ms\n64 bytes from 8.8.8.8: icmp_seq=2 ttl=121 time=31.4 ms\n64 bytes from 8.8.8.8: icmp_seq=3 ttl=121 time=31.8 ms\n64 bytes from 8.8.8.8: icmp_seq=4 ttl=121 time=34.7 ms\n\n```\n\nAhora vamos a inventarnos una dirección IP y volvemos a repetir el ping con el comando `ping 192.168.0.254`\n\n```sh\npi@raspberrypi:~ $ ping 192.168.0.254\nPING 192.168.0.254 (192.168.0.254) 56(84) bytes of data.\nFrom 192.168.0.138 icmp_seq=1 Destination Host Unreachable\nFrom 192.168.0.138 icmp_seq=2 Destination Host Unreachable\nFrom 192.168.0.138 icmp_seq=3 Destination Host Unreachable\n\n```\n\n\n\n\u003Cbr \u002F\u003E\n\n\n\n## Establecer IP Fija\n\nNuestro objetivo será acceder a la propia Raspberry Pi de forma remota, pero para ello debemos establer una dirección IP fija que nunca cambie aunque reiniciemos el sistema.\n\n\u003E Para configurar una IP fija debemos asegurarnos que esté fuera del rango DHCP (configuración del router) y que ningún otro dispositivo tenga asignada la misma dirección IP.\n\n![](img\u002Fip-fija.jpg \"Ip fija\")\n\nLa forma más sencilla de establecer una dirección IP desde Raspbian es desde el entorno gráfico. Para ello haciendo doble clic sobre el icono de `configuración de red`, seleccionamos la interfaz `eth0` si estamos conectados por cable de red o `wifi` en caso de estar mediante wifi.\n\nAñadimos la dirección IP que tengamos libre y permitida en nuestro router. Añadimos también la máscara de red o router y también podemos añadir unas DNS de nuestro router o públicas.\n\n- `IPv4`: Dirección IP fija que queremos (dejar el \u002F24 al final)\n- `Router`: Dirección IP del router\n- `DNS Servers`: Dirección del servidor DNS (la del router)\n\nA continuación guardamos los cambios y reiniciamos la Raspberry Pi para ver que los cambios son correctos. Al reiniciar, volvemos a acceder a la configuración de red y veremos que la IP está guardada.\n\n\n\n\u003Cbr \u002F\u003E\n\n\n\n## Ejercicios propuestos\n\n1.- Averigua tu dirección IP y prueba hacer un ping desde otro equipo a tu IP. Comprueba que la respuesta es correcta.\n\n2.- Asigna una dirección IP fija a tu Raspberry Pi y reinicia el sistema para comprobar el correcto funcionamiento. (Recuerda establecer una IP disponible y fuera del rango DHCP de tu router).\n",cdn:"https:\u002F\u002Fraw.githubusercontent.com\u002FProgramoErgoSum\u002FTutoriales\u002Fmaster\u002Fv1\u002Fdirecciones-ip-en-raspberry-pi\u002F",breadcrumbs:[{text:"Tutoriales",disabled:false,to:"\u002Ftutoriales"},{text:a,disabled:true,to:j}]}],fetch:[],mutations:[]}}("Direcciones IP en Raspberry Pi","Establecer una dirección IP Fija a nuestra Raspberry Pi.",Array(1),"Informática","Raspberry Pi","Secundaria","Bachillerato","Raspbian","Redes","",{})));