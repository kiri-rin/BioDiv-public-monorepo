library("sf")
library("sp")
library("spdep")
library("geojsonsf")

MoranService<-function(points_geojson,areas_geojson,output){
#points <- st_read( "../assets/predictedObservations/predictedObservations-point.shp")
points <- geojson_sf(points_geojson)

areas <- geojson_sf(areas_geojson)


filteredPoints <- sf::st_filter(st_set_crs(points, 4269),st_set_crs(areas,4269))
filteredPoints
coords <-  remove.duplicates(as(filteredPoints,"Spatial"))

coords
class(coords)
nn<-knearneigh(coords, k=5)
nn
mydata_nb1 <- knn2nb(knearneigh(coords, k=5))
mydata_nb1

plot(mydata_nb1,coords,pch = 20,col=rgb(1,0,0,abs(coords$observed-coords$b1)/100))

plot(areas[0])

plot(coords,pch = 20,col=rgb(1,0,0,abs(coords$observed-coords$b1)/100),add=TRUE)

plot(coords,pch = 20,col=rgb(1,0,0,abs(coords$observed)/100),add=TRUE)

rf_residuals <- coords$observed-coords$b1
W <- nb2listw(mydata_nb1, style="W")
sim <- moran.mc(rf_residuals, listw = W, nsim = 10000)

jpeg(paste(output,"hist.jpg",sep = "/"))
hist(sim$res,
     freq = TRUE,
     breaks = 20,
     xlim = c(-1,1),
     main = "Перестановочный тест Морана",
     xlab = "Случайный индекс Морана",
     ylab = "Частота появления",
     col = "steelblue")

abline(v = sim$statistic, col = "red")
dev.off()

jpeg(paste(output,"plot.jpg",sep = "/"))

moran.plot(rf_residuals, W)
dev.off()


test <- moran.test(rf_residuals, W)

sink(paste(output,"res.txt",sep = "/"))
print(test)
sink()

vars <- coords$observed
jpeg(paste(output,"plot2.jpg",sep = "/"))

list(estimate_stat=test$estimate[1],estimate_variance=test$estimate[3],estimate_expect=test$estimate[2],std=test$statistic,p_value=test$p.value,alternative=test$alternative,method=test$method)
}
