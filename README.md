# cloud-homework
M2 Mosig Cloud

PLease find the code under master branch. This main branch contains only the README file of the report.

## Made By :
* **HASSY Hafssa** [@hafssa-hassy](https://github.com/hafssa-hassy) - hafssa.hassy@grenoble-inp.org
* **OUZZINE Aya**  [@ayaouzzine](https://github.com/ayaouzzine) - aya.ouzzine@grenoble-inp.org
## Deployment of Microservices with JHipster on GCP
![gcp_ok](/captures/gcp_ok.png)
### Remark : 
After executing "$ ./kubectl-apply.sh", we got the deployment on gcp of our different components.

### Problem : 
Due to quotas limitations, we couldn't get our cluster working. The problem was that pods didn't have minimum availability. We tried changing to a zone with lower cost and with different types of machines but in vain. The pods were still unschedulable once the number of nodes in the cluster is reached.

![error_gcp](/captures/error_gcp.png)

## Accessing to the deployed application
Once the containers are launched, we could acces to our application using the EXTERNAL-IP with port 8080.

![cluster_ip](/captures/cluster_ip.png)

## Monitoring the microservices

When trying to export metrics from Prometheus to the Grafana Dashboard, we encountered the following problem of connection refused. The link was accessible from the browser, but the connection from Graphana couldn't be established. 

![prometheus](/captures/prometheus.png)

Therefore, the graphics from Graphana dashboard didn't have any data :

![no_data](/captures/no_data.png)

## Enabling scalability

To automatically scale the number of pods of a given microservice, we could base our logic on resource utilization. Once it exceeds the given limits, new pods will be scheduled. We could also define an autoscaling for the entire cluster.
