import React from "react";

const CaptainDetails = () => {
    return (
        <div>
            {/* Profile & Earnings */}
            <div className="flex items-center justify-between mt-7">
                    <div className="flex items-center gap-3">
                        <img
                            className="h-10 w-10 rounded-full object-cover"
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdlMd7stpWUCmjpfRjUsQ72xSWikidbgaI1w&s"
                            alt="Profile"
                        />
                        <h4 className="text-lg font-medium">Harshita Patel</h4>
                    </div>
                    <div>
                        <h4 className="text-xl font-semibold">₹604.27</h4>
                        <p className="text-sm text-gray-600">Earned</p>
                    </div>
                </div>

                {/* Stats Section - Just Below Earnings */}
                <div className="mt-4 flex p-3 bg-gray-100 rounded-xl justify-center gap-6 items-center">
                    <div className="text-center">
                        <i className="text-3xl mb-2 xl font-thin ri-time-line"></i>
                        <h5 className="text-xl font-medium">10.2</h5>
                        <p className="text-sm text-gray-600">Hours Online</p>
                    </div>
                    <div className="text-center">
                        <i className="text-3xl mb-2 xl font-thin ri-speed-up-line"></i>
                        <h5 className="text-xl font-medium">15</h5>
                        <p className="text-sm text-gray-600">Trips Completed</p>
                    </div>
                    <div className="text-center">
                        <i className="text-3xl mb-2 xl font-thin ri-sticky-note-add-fill"></i>
                        <h5 className="text-xl font-medium">4.2</h5>
                        <p className="text-sm text-gray-600">Ratings</p>
                    </div>
                </div>

                {/* Monthly Analysis Section */}
                <div className="mt-4 p-4 bg-gray-100 rounded-xl">
                    <h4 className="text-lg font-semibold text-center mb-3">Monthly Analysis</h4>
                    <div className="flex justify-center gap-6 items-center">
                        <div className="text-center">
                            <i className="text-3xl mb-2 xl font-thin ri-time-line"></i>
                            <h5 className="text-xl font-medium">107 hrs</h5>
                            <p className="text-sm text-gray-600">Hours Online</p>
                        </div>
                        <div className="text-center">
                            <i className="text-3xl mb-2 xl font-thin ri-speed-up-line"></i>
                            <h5 className="text-xl font-medium">150</h5>
                            <p className="text-sm text-gray-600">Trips Completed</p>
                        </div>
                        <div className="text-center">
                            <i className="text-3xl mb-2 xl font-thin ri-sticky-note-add-fill"></i>
                            <h5 className="text-xl font-medium">4.7</h5>
                            <p className="text-sm text-gray-600">Ratings</p>
                        </div>
                    </div>
                </div>
        </div>
    );
};

export default CaptainDetails;
