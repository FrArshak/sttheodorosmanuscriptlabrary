<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\App;
use Illuminate\Mail\Mailer;

class MailSender implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;


    public $mailTo;
    public $mailData;

    /**
     * Create a new job instance.
     */
    public function __construct($mailTo, $mailData)
    {
        $this->mailTo = $mailTo;
        $this->mailData = $mailData;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $mail = App::make(Mailer::class);
        $mail->to($this->mailTo)->send($this->mailData);
    }
}
