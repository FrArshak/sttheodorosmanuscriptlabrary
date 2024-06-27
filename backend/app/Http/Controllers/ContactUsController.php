<?php

namespace App\Http\Controllers;

use App\Http\Requests\EmailRequest;
use App\Mail\ContactUs;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class ContactUsController extends Controller
{
    /**
     * @param EmailRequest $request
     * @return JsonResponse
     */
    public function contactUs(EmailRequest $request): JsonResponse
    {
        try {
            $emailData = $request->all();

            $userEmails = User::select('email')->get()->toArray();

            foreach ($userEmails as $email) {
                Mail::to($email['email'])->send(new ContactUs($emailData));
            }

            return response()->json([
                'success' => 1,
                'type' => 'success',
                'message'  => 'Your massage has been sent',
            ]);
        } catch (\Exception $exception) {
            Log::error($exception->getMessage());
            return response()->json([
                'success' => 0,
                'type' => 'error',
                'message'  => 'Something went wrong.Here is the error => ' . $exception->getMessage(),
            ]);
        }
    }
}
