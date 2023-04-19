from django.urls import path
from base.views import order_views as views



urlpatterns = [
    
    path('', views.getOrders, name='orders'),
    path('add/', views.placeOrder, name='order'),
    path('myOrders/', views.myOrders, name='myorders'),
    path('<str:pk>/', views.getOrderById, name='get-order'),
    path('<str:pk>/pay/', views.updateOrderToPaid, name='order-paid'),
    path('<str:pk>/delivery/', views.updateOrderToDelivered, name='order-delivered'),

]

