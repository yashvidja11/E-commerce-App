import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const SavedAddress: React.FC = () => {
  const addresses = useSelector((state: RootState) => state.addressData.address);
  console.log(addresses);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Saved Addresses</h2>

      {addresses && addresses.length > 0 ? (
        addresses.map((address:any) => (
          <div className="bg-white shadow-md p-4 rounded-lg mb-4">
            <div className="mb-2">
              <span className="text-gray-600">Street: </span>
              <span className="text-gray-800">{address.streetAddress}</span>
            </div>
            <div className="mb-2">
              <span className="text-gray-600">City: </span>
              <span className="text-gray-800">{address.townCity}</span>
            </div>
            <div className="mb-2">
              <span className="text-gray-600">State: </span>
              <span className="text-gray-800">{address.state}</span>
            </div>
            {/* Add more address fields here */}
          </div>
        ))
      ) : (
        <p className="text-gray-500">No addresses saved.</p>
      )}
    </div>
  );
};

export default SavedAddress;
