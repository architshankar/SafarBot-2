import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
    CalendarDays,
    Car,
    Hotel,
    Music,
    Utensils,
    CircleDollarSign,
    Plug,
    Languages,
    BusFront,
    Phone,
    FileText,
    Mail,
    Map
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Link } from "react-router-dom";

const ItineraryPage = () => {
    const { toast } = useToast();
    const [expandedDays, setExpandedDays] = useState([1]);
    const [showDownloadDialog, setShowDownloadDialog] = useState(false);
    const [showEmailDialog, setShowEmailDialog] = useState(false);

    // Mock data - would come from API in production
    const tripData = {
        destination: "Paris, France",
        startDate: "May 15, 2025",
        endDate: "May 22, 2025",
        duration: 7,
        currency: {
            name: "Euro (€)",
            conversionRate: 91.23 // 1 EUR = 91.23 INR
        },
        weather: "Mild with occasional rain",
        language: "French",
        emergencyContact: "112",
        electricalOutlet: "Type C, 230V",
        transportation: ["Metro", "Bus", "Taxi", "Rental Bike"],
        cost: {
            transportation: { eur: 350, inr: 31930 },
            accommodation: { eur: 600, inr: 54738 },
            food: { eur: 280, inr: 25544 },
            activities: { eur: 200, inr: 18246 },
            miscellaneous: { eur: 100, inr: 9123 },
            total: { eur: 1530, inr: 139581 }
        }
    };

    const itineraryDays = [
        {
            day: 1,
            title: "Arrival in Paris",
            transport: {
                type: "Flight",
                details: "Air France AF127",
                time: "09:30 - 15:45",
                cost: "€280"
            },
            accommodation: {
                name: "Hotel de Seine",
                checkIn: "16:00",
                checkOut: "11:00",
                price: "€120/night",
                location: "Saint-Germain-des-Prés"
            },
            activities: [
                {
                    name: "Check in and rest",
                    time: "16:00 - 18:00",
                    indoor: true,
                    location: "Hotel de Seine, Saint-Germain-des-Prés"
                },
                {
                    name: "Evening stroll along Seine River",
                    time: "18:30 - 20:00",
                    indoor: false,
                    location: "Seine River, Paris"
                }
            ],
            food: [
                {
                    name: "Café de Flore",
                    cuisine: "French Bistro",
                    mealType: "Dinner",
                    price: "€€",
                    location: "6-minute walk from hotel"
                }
            ],
            tips: "Purchase a Paris Museum Pass on your first day to save money on attractions."
        },
        {
            day: 2,
            title: "Eiffel Tower & Louvre",
            transport: {
                type: "Metro",
                details: "Line 4 to Line 6",
                time: "09:00",
                cost: "€1.90"
            },
            accommodation: {
                name: "Hotel de Seine",
                checkIn: "Already checked in",
                checkOut: "11:00 (next day)",
                price: "€120/night",
                location: "Saint-Germain-des-Prés"
            },
            activities: [
                {
                    name: "Eiffel Tower Visit",
                    time: "10:00 - 12:30",
                    indoor: false
                },
                {
                    name: "Lunch at Champ de Mars",
                    time: "12:30 - 14:00",
                    indoor: false
                },
                {
                    name: "Louvre Museum",
                    time: "15:00 - 18:00",
                    indoor: true
                }
            ],
            food: [
                {
                    name: "Café Marly",
                    cuisine: "French Contemporary",
                    mealType: "Dinner",
                    price: "€€€",
                    location: "At the Louvre"
                }
            ],
            tips: "Visit Eiffel Tower early to avoid crowds. For Louvre, enter through the Carrousel du Louvre entrance to avoid long lines."
        },
        {
            day: 3,
            title: "Montmartre & Sacré-Cœur",
            transport: {
                type: "Metro",
                details: "Line 4 to Line 2",
                time: "09:30",
                cost: "€1.90"
            },
            accommodation: {
                name: "Hotel de Seine",
                checkIn: "Already checked in",
                checkOut: "11:00 (next day)",
                price: "€120/night",
                location: "Saint-Germain-des-Prés"
            },
            activities: [
                {
                    name: "Sacré-Cœur Basilica",
                    time: "10:00 - 11:30",
                    indoor: true
                },
                {
                    name: "Montmartre Walking Tour",
                    time: "11:30 - 13:30",
                    indoor: false
                },
                {
                    name: "Place du Tertre (Artist Square)",
                    time: "14:00 - 15:30",
                    indoor: false
                },
                {
                    name: "Moulin Rouge (outside view)",
                    time: "16:00 - 16:30",
                    indoor: false
                }
            ],
            food: [
                {
                    name: "La Maison Rose",
                    cuisine: "French Traditional",
                    mealType: "Lunch",
                    price: "€€",
                    location: "Montmartre"
                },
                {
                    name: "Le Consulat",
                    cuisine: "French Bistro",
                    mealType: "Dinner",
                    price: "€€",
                    location: "Montmartre"
                }
            ],
            tips: "Wear comfortable shoes as Montmartre has many steep streets and stairs."
        },
        {
            day: 4,
            title: "Notre Dame & Latin Quarter",
            transport: {
                type: "Walking & Metro",
                details: "Line 4",
                time: "09:30",
                cost: "€1.90"
            },
            accommodation: {
                name: "Hotel de Seine",
                checkIn: "Already checked in",
                checkOut: "11:00 (next day)",
                price: "€120/night",
                location: "Saint-Germain-des-Prés"
            },
            activities: [
                {
                    name: "Notre Dame Cathedral (exterior view due to reconstruction)",
                    time: "10:00 - 11:00",
                    indoor: false
                },
                {
                    name: "Shakespeare and Company Bookstore",
                    time: "11:15 - 12:15",
                    indoor: true
                },
                {
                    name: "Sainte-Chapelle",
                    time: "13:30 - 14:30",
                    indoor: true
                },
                {
                    name: "Panthéon",
                    time: "15:00 - 16:30",
                    indoor: true
                }
            ],
            food: [
                {
                    name: "Café de la Nouvelle Mairie",
                    cuisine: "French Bistro",
                    mealType: "Lunch",
                    price: "€€",
                    location: "Latin Quarter"
                },
                {
                    name: "Le Petit Prince de Paris",
                    cuisine: "French Traditional",
                    mealType: "Dinner",
                    price: "€€",
                    location: "Latin Quarter"
                }
            ],
            tips: "Even though Notre Dame is under reconstruction after the 2019 fire, the exterior is still worth seeing."
        },
        {
            day: 5,
            title: "Versailles Day Trip",
            transport: {
                type: "Train",
                details: "RER Line C to Versailles",
                time: "09:00",
                cost: "€7.10 (round trip)"
            },
            accommodation: {
                name: "Hotel de Seine",
                checkIn: "Already checked in",
                checkOut: "11:00 (next day)",
                price: "€120/night",
                location: "Saint-Germain-des-Prés"
            },
            activities: [
                {
                    name: "Palace of Versailles",
                    time: "10:00 - 13:00",
                    indoor: true
                },
                {
                    name: "Gardens of Versailles",
                    time: "13:00 - 15:00",
                    indoor: false
                },
                {
                    name: "Grand Trianon and Petit Trianon",
                    time: "15:00 - 16:30",
                    indoor: true
                }
            ],
            food: [
                {
                    name: "La Flottille",
                    cuisine: "French Traditional",
                    mealType: "Lunch",
                    price: "€€€",
                    location: "In Versailles Gardens"
                },
                {
                    name: "Bistro de Paris",
                    cuisine: "French Bistro",
                    mealType: "Dinner",
                    price: "€€",
                    location: "Back in Paris"
                }
            ],
            tips: "Purchase tickets online in advance to skip the long lines at Versailles."
        },
        {
            day: 6,
            title: "Musée d'Orsay & Seine River Cruise",
            transport: {
                type: "Metro & Walking",
                details: "Line 4",
                time: "09:30",
                cost: "€1.90"
            },
            accommodation: {
                name: "Hotel de Seine",
                checkIn: "Already checked in",
                checkOut: "11:00 (next day)",
                price: "€120/night",
                location: "Saint-Germain-des-Prés"
            },
            activities: [
                {
                    name: "Musée d'Orsay",
                    time: "10:00 - 13:00",
                    indoor: true
                },
                {
                    name: "Tuileries Garden",
                    time: "13:30 - 14:30",
                    indoor: false
                },
                {
                    name: "Shopping on Avenue des Champs-Élysées",
                    time: "15:00 - 17:00",
                    indoor: true
                },
                {
                    name: "Seine River Sunset Cruise",
                    time: "19:00 - 20:30",
                    indoor: false
                }
            ],
            food: [
                {
                    name: "Café Campana",
                    cuisine: "French Contemporary",
                    mealType: "Lunch",
                    price: "€€",
                    location: "In Musée d'Orsay"
                },
                {
                    name: "Les Ombres",
                    cuisine: "French Gourmet",
                    mealType: "Dinner",
                    price: "€€€€",
                    location: "Quai Branly"
                }
            ],
            tips: "The Musée d'Orsay is housed in the former Gare d'Orsay, a beautiful Beaux-Arts railway station built between 1898 and 1900."
        },
        {
            day: 7,
            title: "Departure Day",
            transport: {
                type: "Airport Shuttle",
                details: "Hotel to Charles de Gaulle Airport",
                time: "11:00",
                cost: "€18"
            },
            accommodation: {
                name: "Hotel de Seine",
                checkIn: "Already checked in",
                checkOut: "11:00",
                price: "€120/night",
                location: "Saint-Germain-des-Prés"
            },
            activities: [
                {
                    name: "Last-minute shopping near hotel",
                    time: "09:00 - 10:30",
                    indoor: true
                }
            ],
            food: [
                {
                    name: "Café de Paris",
                    cuisine: "French Pastries & Coffee",
                    mealType: "Breakfast",
                    price: "€",
                    location: "Near hotel"
                }
            ],
            tips: "Leave for the airport at least 3 hours before your international flight."
        }
    ];


    const handleDayToggle = (dayNum) => {
        if (expandedDays.includes(dayNum)) {
            setExpandedDays(expandedDays.filter(d => d !== dayNum));
        } else {
            setExpandedDays([...expandedDays, dayNum]);
        }
    };

    const handleDownloadPdf = () => {
        setShowDownloadDialog(true);
    };

    const handleEmailItinerary = () => {
        setShowEmailDialog(true);
    };

    const initiateDownload = () => {
        toast({
            title: "Download Started",
            description: "Your itinerary PDF is being prepared for download",
        });
        setShowDownloadDialog(false);

        setTimeout(() => {
            toast({
                title: "Download Complete",
                description: "Your itinerary PDF has been downloaded",
            });
        }, 2000);
    };

    const sendEmail = (email) => {
        toast({
            title: "Email Sent",
            description: `Your itinerary has been sent to ${email}`,
        });
        setShowEmailDialog(false);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Trip Summary Header */}
            
            <div
                className="relative h-[350px] text-white bg-cover bg-bottom"
                style={{
                    backgroundImage: `
      linear-gradient(to right, rgba(255, 123, 0, 0.7), rgba(255, 94, 0, 0.7)),
      url('https://images.unsplash.com/photo-1550340499-a6c60fc8287c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')
    `,
                    backgroundSize: 'cover',
                    backgroundPosition: 'top center',
                }}
            >
                <div className="absolute bottom-0 w-full">
                    <div className="container mx-auto px-4 py-6 md:py-8">
                        <div className="flex flex-col md:flex-row justify-between items-center">
                            <div className="w-full md:w-auto">
                                <h1 className="text-4xl md:text-4xl font-bold mb-2 truncate max-w-full">
                                    Your Trip to {tripData.destination}
                                </h1>
                                <div className="flex items-center text-base md:text-lg">
                                    <CalendarDays className="h-4 w-4 mr-1" />
                                    <span className="truncate">
                                        {tripData.startDate} - {tripData.endDate} • {tripData.duration} days
                                    </span>
                                </div>
                            </div>
                            <div className="flex space-x-2 mt-4 md:mt-0">
                                <Button
                                    onClick={handleDownloadPdf}
                                    className="bg-white hover:bg-gray-100 text-orange-600 hover:text-orange-700 border border-orange-200"
                                >
                                    <FileText className="h-4 w-4 mr-2" />
                                    Download PDF
                                </Button>
                                <Button
                                    onClick={handleEmailItinerary}
                                    className="bg-white hover:bg-gray-100 text-orange-600 hover:text-orange-700 border border-orange-200"
                                >
                                    <Mail className="h-4 w-4 mr-2" />
                                    Email Itinerary
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* Main Content */}
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Main Itinerary Column */}
                    <div className="flex-1">
                        <h2 className="text-xl font-bold mb-4">Day-by-Day Itinerary</h2>

                        {/* Itinerary Accordion */}
                        <div className="space-y-4">
                            {itineraryDays.map((day) => (
                                <Card key={day.day} className="overflow-hidden">
                                    <CardHeader
                                        className={`cursor-pointer ${expandedDays.includes(day.day) ? 'bg-orange-50' : 'bg-white'}`}
                                        onClick={() => handleDayToggle(day.day)}
                                    >
                                        <div className="flex items-center justify-between">
                                            <CardTitle className="text-lg">
                                                Day {day.day} – {day.title}
                                            </CardTitle>
                                            <div className="text-xs md:text-sm text-gray-500">
                                                {expandedDays.includes(day.day) ? 'Hide Details' : 'Show Details'}
                                            </div>
                                        </div>
                                    </CardHeader>

                                    {expandedDays.includes(day.day) && (
                                        <CardContent className="pt-4">
                                            {/* Transport */}
                                            <div className="mb-4">
                                                <div className="flex items-center mb-2">
                                                    <Car className="h-5 w-5 mr-2 text-blue-500" />
                                                    <h3 className="font-semibold">Transport</h3>
                                                </div>
                                                <div className="pl-7 text-sm">
                                                    <div><span className="font-medium">{day.transport.type}:</span> {day.transport.details}</div>
                                                    <div><span className="font-medium">Time:</span> {day.transport.time}</div>
                                                    <div><span className="font-medium">Cost:</span> {day.transport.cost}</div>
                                                </div>
                                            </div>

                                            {/* Accommodation */}
                                            <div className="mb-4">
                                                <div className="flex items-center mb-2">
                                                    <Hotel className="h-5 w-5 mr-2 text-purple-500" />
                                                    <h3 className="font-semibold">Accommodation</h3>
                                                </div>
                                                <div className="pl-7 text-sm">
                                                    <div><span className="font-medium">{day.accommodation.name}</span> - {day.accommodation.location}</div>
                                                    <div><span className="font-medium">Check-in:</span> {day.accommodation.checkIn}</div>
                                                    <div><span className="font-medium">Check-out:</span> {day.accommodation.checkOut}</div>
                                                    <div><span className="font-medium">Price:</span> {day.accommodation.price}</div>
                                                </div>
                                            </div>

                                            {/* Activities */}
                                            <div className="mb-4">
                                                <div className="flex items-center mb-2">
                                                    <Music className="h-5 w-5 mr-2 text-green-500" />
                                                    <h3 className="font-semibold">Activities</h3>
                                                </div>
                                                <div className="pl-7">
                                                    <ul className="space-y-2">
                                                        {day.activities.map((activity, idx) => (
                                                            <li key={idx} className="text-sm">
                                                                <div className="font-medium">{activity.time}</div>
                                                                <div className="flex items-center justify-between">
                                                                    <div className="flex items-center">
                                                                        <span>{activity.name}</span>
                                                                        {activity.indoor ? (
                                                                            <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">Indoor</span>
                                                                        ) : (
                                                                            <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">Outdoor</span>
                                                                        )}
                                                                    </div>
                                                                    <Link
                                                                        to={`/planner?location=${encodeURIComponent(activity.location)}`}
                                                                        className="flex items-center text-blue-600 hover:text-blue-800"
                                                                    >
                                                                        <Map className="h-4 w-4 mr-1" />
                                                                        <span className="text-xs">View on Map</span>
                                                                    </Link>
                                                                </div>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>

                                            {/* Food */}
                                            <div className="mb-4">
                                                <div className="flex items-center mb-2">
                                                    <Utensils className="h-5 w-5 mr-2 text-orange-500" />
                                                    <h3 className="font-semibold">Food Recommendations</h3>
                                                </div>
                                                <div className="pl-7">
                                                    <ul className="space-y-3">
                                                        {day.food.map((meal, idx) => (
                                                            <li key={idx} className="text-sm">
                                                                <div className="font-medium">{meal.name} • {meal.mealType}</div>
                                                                <div className="text-gray-600">{meal.cuisine} • {meal.price} • {meal.location}</div>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>

                                            {/* Tips */}
                                            {day.tips && (
                                                <div className="mt-4 bg-yellow-50 border-l-4 border-yellow-400 p-3 text-sm">
                                                    <div className="font-medium">Travel Tip:</div>
                                                    <div>{day.tips}</div>
                                                </div>
                                            )}
                                        </CardContent>
                                    )}
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:w-1/3 space-y-6">
                        {/* Travel Information Card */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Destination Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-start">
                                    <div className="bg-orange-100 p-2 rounded-md mr-3">
                                        <CircleDollarSign className="h-5 w-5 text-orange-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium">Currency</h4>
                                        <p className="text-sm text-gray-600">{tripData.currency.name}</p>
                                        <p className="text-xs text-gray-500">1 EUR = {tripData.currency.conversionRate} INR</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="bg-blue-100 p-2 rounded-md mr-3">
                                        <Plug className="h-5 w-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium">Electrical Outlets</h4>
                                        <p className="text-sm text-gray-600">{tripData.electricalOutlet}</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="bg-purple-100 p-2 rounded-md mr-3">
                                        <Languages className="h-5 w-5 text-purple-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium">Languages</h4>
                                        <p className="text-sm text-gray-600">{tripData.language}</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="bg-green-100 p-2 rounded-md mr-3">
                                        <BusFront className="h-5 w-5 text-green-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium">Local Transportation</h4>
                                        <p className="text-sm text-gray-600">{tripData.transportation.join(", ")}</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="bg-red-100 p-2 rounded-md mr-3">
                                        <Phone className="h-5 w-5 text-red-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium">Emergency Contact</h4>
                                        <p className="text-sm text-gray-600">{tripData.emergencyContact}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Cost Estimation Card */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Cost Estimation</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <table className="w-full">
                                    <tbody>
                                        <tr className="border-b">
                                            <td className="py-2 font-medium">Transportation</td>
                                            <td className="py-2 text-right">€{tripData.cost.transportation.eur}</td>
                                            <td className="py-2 text-right text-gray-500 text-sm">₹{tripData.cost.transportation.inr}</td>
                                        </tr>
                                        <tr className="border-b">
                                            <td className="py-2 font-medium">Accommodation</td>
                                            <td className="py-2 text-right">€{tripData.cost.accommodation.eur}</td>
                                            <td className="py-2 text-right text-gray-500 text-sm">₹{tripData.cost.accommodation.inr}</td>
                                        </tr>
                                        <tr className="border-b">
                                            <td className="py-2 font-medium">Food</td>
                                            <td className="py-2 text-right">€{tripData.cost.food.eur}</td>
                                            <td className="py-2 text-right text-gray-500 text-sm">₹{tripData.cost.food.inr}</td>
                                        </tr>
                                        <tr className="border-b">
                                            <td className="py-2 font-medium">Activities</td>
                                            <td className="py-2 text-right">€{tripData.cost.activities.eur}</td>
                                            <td className="py-2 text-right text-gray-500 text-sm">₹{tripData.cost.activities.inr}</td>
                                        </tr>
                                        <tr className="border-b">
                                            <td className="py-2 font-medium">Miscellaneous</td>
                                            <td className="py-2 text-right">€{tripData.cost.miscellaneous.eur}</td>
                                            <td className="py-2 text-right text-gray-500 text-sm">₹{tripData.cost.miscellaneous.inr}</td>
                                        </tr>
                                        <tr className="font-bold">
                                            <td className="pt-3">Total</td>
                                            <td className="pt-3 text-right">€{tripData.cost.total.eur}</td>
                                            <td className="pt-3 text-right text-gray-700 text-sm">₹{tripData.cost.total.inr}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

            {/* Download Dialog */}
            <Dialog open={showDownloadDialog} onOpenChange={setShowDownloadDialog}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Download Itinerary</DialogTitle>
                        <DialogDescription>
                            Your itinerary for Paris will be downloaded as a PDF file.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-end space-x-2 pt-4">
                        <Button variant="outline" onClick={() => setShowDownloadDialog(false)}>Cancel</Button>
                        <Button onClick={initiateDownload}>Download</Button>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Email Dialog */}
            <Dialog open={showEmailDialog} onOpenChange={setShowEmailDialog}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Email Itinerary</DialogTitle>
                        <DialogDescription>
                            Enter your email address to receive the itinerary.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="email" className="text-right text-sm font-medium">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                                placeholder="your.email@example.com"
                            />
                        </div>
                    </div>
                    <div className="flex justify-end space-x-2">
                        <Button variant="outline" onClick={() => setShowEmailDialog(false)}>Cancel</Button>
                        <Button onClick={() => sendEmail("user@example.com")}>Send</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ItineraryPage;
