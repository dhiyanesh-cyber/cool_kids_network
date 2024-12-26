import { Card, CardBody } from "@nextui-org/react";
import authService from "../../services/authService";
import { FaGlobe, FaTag } from 'react-icons/fa';

export function CardSpotlightDemo(props) {
    const user = props.user;
    const currentUser = authService.getCurrentUser();

    // Determine if the user is the "Coolest Kid"
    const isCoolestKid = user.role === 'Coolest Kid';
    const isCurrentCoolestKid = currentUser.role === 'Coolest Kid';
    const isCurrentMaintainer = authService.isMaintainer();

    return (
        <div className="relative">
            <Card className={`relative rounded-2xl px-6 py-3 transform transition hover:scale-100 ${user.role === 'Cooler Kid' ? 'cooler-gradient-shadow' : 'bg-opacity-80'}  ${isCoolestKid ? 'coolest-gradient-shadow' : 'bg-opacity-80'}`}>
                <CardBody>
                    <div className="flex items-center mb-4">
                        <div className="w-16 h-16 bg-dark-bg rounded-full flex items-center justify-center text-dark-text text-2xl mr-4">
                            {user.firstName[0].toUpperCase()}
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-dark-text">
                                {user.firstName} {user.lastName}
                            </h3>
                            {isCurrentCoolestKid || isCurrentMaintainer && (
                                <p className="text-sm">{user.email}</p>
                            )}
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center">
                            <FaGlobe className="mr-2 text-dark-text" />
                            <span className="font-medium text-dark-text">{user.country}</span>
                        </div>
                        {isCurrentCoolestKid || isCurrentMaintainer && (
                            <div className="flex items-center">
                                <FaTag className="mr-2 text-dark-text" />
                                <span className="font-medium">{user.role}</span>
                            </div>
                        )}
                    </div>
                </CardBody>
            </Card>
        </div>
    );
}